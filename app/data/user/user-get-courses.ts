import { prisma } from "@/lib/db";
import { cache } from "react";
import "server-only";

const ITEMS_PER_PAGE = 3;

export const userGetCourses = cache(async (page: number = 1) => {
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const [data, totalCount] = await Promise.all([
    prisma.course.findMany({
      where: {
        status: "Published",
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
export type UserCourseType = Awaited<
  ReturnType<typeof userGetCourses>
>["courses"][0];
