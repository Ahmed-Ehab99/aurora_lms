import { prisma } from "@/lib/db";
import { cache } from "react";
import "server-only";
import { requireUser } from "./require-user";

export const userGetEnrolledCourses = cache(async () => {
  const user = await requireUser();
  const enrollmentCourses = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
    },
    select: {
      course: {
        select: {
          id: true,
          smallDescription: true,
          title: true,
          fileKey: true,
          level: true,
          slug: true,
          duration: true,
          chapter: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return enrollmentCourses;
});

// Dynamic type
export type UserEnrolledCoursesType = Awaited<
  ReturnType<typeof userGetEnrolledCourses>
>[0];
