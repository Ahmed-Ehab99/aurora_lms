"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { ajProtection, handleArcjetDecision } from "@/hooks/aj-protection";
import { prisma } from "@/lib/db";
import { courseSchema, CourseSchemaType } from "@/lib/schemas";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";

const aj = ajProtection({
  window: "1m", // Max numbers of courses that user can edit is 5 courses in 1 min
  max: 5,
});

export async function editCourse(
  data: CourseSchemaType,
  courseId: string,
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id,
    });
    const denialResponse = handleArcjetDecision(decision);
    if (denialResponse) return denialResponse;

    const result = courseSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid Data",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: session.user.id,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: "success",
      message: "Course updated succeddfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to update course",
    };
  }
}
