import { prisma } from "@/lib/db";
import { cache } from "react";
import "server-only";
import { requireAdmin } from "./require-admin";
import { Role } from "@/prisma/generated/prisma/enums";

export const adminGetDashboardStats = cache(async () => {
  await requireAdmin();

  const [totalSignups, totalCustomers, totalCourses, totalLessons] =
    await Promise.all([
      // Total Signups
      prisma.user.count({
        where: {
          role: Role.user,
        },
      }),
      // Total Customers
      prisma.user.count({
        where: {
          enrollment: {
            some: {},
          },
          role: Role.user,
        },
      }),
      // Total Courses
      prisma.course.count(),
      // Total Lessons
      prisma.lesson.count(),
    ]);

  return {
    totalSignups,
    totalCustomers,
    totalCourses,
    totalLessons,
  };
});
