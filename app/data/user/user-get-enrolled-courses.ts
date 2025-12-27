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
          category: true,
          chapter: {
            select: {
              id: true,
              title: true,
              position: true,
              lessons: {
                select: {
                  id: true,
                  title: true,
                  description: true,
                  position: true,
                  lessonProgress: {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      id: true,
                      completed: true,
                      lessonId: true,
                    },
                  },
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

// Lightweight function to fetch only enrolled course IDs without the nested chapter/lesson/progress data.
// much faster than the full userGetEnrolledCourses() call.
export const userGetEnrolledCourseIds = cache(async () => {
  const user = await requireUser();

  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
    },
    select: {
      courseId: true,
    },
  });

  return enrollments.map((enrollment) => enrollment.courseId);
});
