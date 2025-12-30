import { prisma } from "@/lib/db";
import { cache } from "react";
import "server-only";
import { requireUser } from "./require-user";

const ITEMS_PER_PAGE = 9;

export const userGetAvailableCourses = cache(async (page: number = 1) => {
  const user = await requireUser();

  // Get enrolled course IDs
  const enrollments = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "Active",
    },
    select: {
      courseId: true,
    },
  });

  const enrolledCourseIds = enrollments.map((e) => e.courseId);

  // Calculate pagination
  const skip = (page - 1) * ITEMS_PER_PAGE;

  // Fetch courses NOT enrolled - filtered in the query
  const [data, totalCount] = await Promise.all([
    prisma.course.findMany({
      where: {
        status: "Published",
        id: {
          notIn: enrolledCourseIds, // Filter at database level
        },
      },
      select: {
        id: true,
        title: true,
        smallDescription: true,
        duration: true,
        level: true,
        status: true,
        price: true,
        fileKey: true,
        category: true,
        slug: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.course.count({
      where: {
        status: "Published",
        id: {
          notIn: enrolledCourseIds, // Count only available courses
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return {
    courses: data,
    totalPages,
    currentPage: page,
    totalCount,
  };
});

// Dynamic type
export type UserAvailableCourseType = Awaited<
  ReturnType<typeof userGetAvailableCourses>
>["courses"][0];
