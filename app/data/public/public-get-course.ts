import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export const publicGetCourse = async (slug: string) => {
  const data = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      level: true,
      price: true,
      fileKey: true,
      category: true,
      description: true,
      chapter: {
        select: {
          id: true,
          title: true,
          lessons: {
            select: {
              id: true,
              title: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!data) notFound();

  return data;
};

// Dynamic type
export type PublicCourseSingularType = Awaited<
  ReturnType<typeof publicGetCourse>
>;
