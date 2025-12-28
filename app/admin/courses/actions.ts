"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import {
  ajProtection,
  handleArcjetDecisionAction,
} from "@/hooks/aj-protection";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = ajProtection({
  window: "1m", // Max numbers of courses that user can delete is 5 courses in 1 min
  max: 5,
});

export const deleteCourse = async (courseId: string): Promise<ApiResponse> => {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id,
    });
    const denialResponse = handleArcjetDecisionAction(decision);
    if (denialResponse) return denialResponse;

    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    revalidatePath("/admin/courses");

    return {
      status: "success",
      message: "Course deleted successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete course",
    };
  }
};
