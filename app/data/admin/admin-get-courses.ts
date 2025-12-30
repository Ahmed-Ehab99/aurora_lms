import { prisma } from "@/lib/db";
import { cache } from "react";
import "server-only";
import { requireAdmin } from "./require-admin";

const ITEMS_PER_PAGE = 9;

export const adminGetCourses = cache(async (page: number = 1) => {
  await requireAdmin();

  const skip = (page - 1) * ITEMS_PER_PAGE;

  const [data, totalCount] = await Promise.all([
    prisma.course.findMany({
      select: {
        id: true,
        title: true,
        smallDescription: true,
        duration: true,
        level: true,
        status: true,
        price: true,
        fileKey: true,
        slug: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: ITEMS_PER_PAGE,
    }),
    prisma.course.count(),
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
export type AdminCourseType = Awaited<
  ReturnType<typeof adminGetCourses>
>["courses"][0];
