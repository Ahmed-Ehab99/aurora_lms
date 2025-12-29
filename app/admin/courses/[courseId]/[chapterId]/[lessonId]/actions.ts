"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import {
  ajProtection,
  handleArcjetDecisionAction,
} from "@/hooks/aj-protection";
import { prisma } from "@/lib/db";
import { lessonSchema, LessonSchemaType } from "@/lib/schemas";
import { ApiResponse } from "@/lib/types";
import { request } from "@arcjet/next";

const aj = ajProtection({
  window: "1m", // Max numbers of lessons that user can edit is 5 lessons in 1 min
  max: 5,
});

export async function editLesson(
  values: LessonSchemaType,
  lessonId: string,
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id,
    });
    const denialResponse = handleArcjetDecisionAction(decision);
    if (denialResponse) return denialResponse;

    const result = lessonSchema.safeParse(values);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid Data",
      };
    }

    if (result.data.videoKey && !result.data.videoKey.endsWith(".mp4")) {
      return {
        status: "error",
        message: "Only MP4 videos are allowed",
      };
    }

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: result.data.name,
        description: result.data.description,
        thumbnailKey: result.data.thumbnailKey,
        videoKey: result.data.videoKey,
      },
    });

    return {
      status: "success",
      message: "Lesson updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to update lesson",
    };
  }
}
