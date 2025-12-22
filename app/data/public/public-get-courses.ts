import { prisma } from "@/lib/db";

export const publicGetCourses = async () => {
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
};

// Dynamic type
export type PublicCourseType = Awaited<ReturnType<typeof publicGetCourses>>[0];
