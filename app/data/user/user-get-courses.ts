import { prisma } from "@/lib/db";
import { cache } from "react";
import "server-only";

export const userGetCourses = cache(async () => {
  const data = await prisma.course.findMany({
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
  });
  return data;
});

// Dynamic type
export type UserCourseType = Awaited<ReturnType<typeof userGetCourses>>[0];
