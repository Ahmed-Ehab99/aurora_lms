"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { ajProtection, handleArcjetDecision } from "@/hooks/aj-protection";
import { prisma } from "@/lib/db";
import { courseSchema, CourseSchemaType } from "@/lib/schemas";
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
    const denialResponse = handleArcjetDecision(decision);
    if (denialResponse) return denialResponse;

    const result = courseSchema.safeParse(values);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    await prisma.course.create({
      data: {
        ...result.data,
        userId: session?.user.id as string,
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
