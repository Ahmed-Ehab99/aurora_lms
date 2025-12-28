"use server";

import { requireUser } from "@/app/data/user/require-user";
import {
  ajProtection,
  handleArcjetDecisionAction,
} from "@/hooks/aj-protection";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";
import { revalidatePath } from "next/cache";

const aj = ajProtection({
  window: "1m", // Max numbers of marked lessons that user can make is 5 lessons in 1 min
  max: 5,
});

export const markLessonComplete = async (
  lessonId: string,
  slug: string,
): Promise<ApiResponse> => {
  const user = await requireUser();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: user.id,
    });
    const denialResponse = handleArcjetDecisionAction(decision);
    if (denialResponse) return denialResponse;

    await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId,
        },
      },
      update: {
        completed: true,
      },
      create: {
        lessonId,
        userId: user.id,
        completed: true,
      },
    });

    revalidatePath(`/dashboard/${slug}`);

    return {
      status: "success",
      message: "Progress updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to mark lesson as complete",
    };
  }
};
