"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import {
  ajProtection,
  handleArcjetDecisionAction,
} from "@/hooks/aj-protection";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { courseSchema, CourseSchemaType } from "@/lib/schemas";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";

const aj = ajProtection({
  window: "1m", // Max numbers of courses that user can create is 5 courses in 1 min
  max: 5,
});

export const createCourse = async (
  values: CourseSchemaType,
): Promise<ApiResponse> => {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id,
    });
    const denialResponse = handleArcjetDecisionAction(decision);
    if (denialResponse) return denialResponse;

    const result = courseSchema.safeParse(values);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    const data = await stripe.products.create({
      images: [
        `https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.t3.storage.dev/${result.data.fileKey}`,
      ],
      name: result.data.title,
      description: result.data.smallDescription,
      default_price_data: {
        currency: "usd",
        unit_amount: result.data.price * 100,
      },
    });

    await prisma.course.create({
      data: {
        ...result.data,
        userId: session?.user.id as string,
        stripePriceId: data.default_price as string,
      },
    });

    return {
      status: "success",
      message: "Course Created Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to Create Course",
    };
  }
};
