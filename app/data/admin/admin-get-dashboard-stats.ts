import { prisma } from "@/lib/db";
import { cache } from "react";
import "server-only";
import { requireAdmin } from "./require-admin";

export const adminGetDashboardStats = cache(async () => {
  await requireAdmin();

  const [totalSignups, totalCustomers, totalCourses, totalLessons] =
    await Promise.all([
      // Total Signups
      // 👇 Uncomment this if you nedd to exclude admins
      // prisma.user.count({
      //   where: {
      //     role: Role.user,
      //   },
      // }),
      prisma.user.count(),
      // Total Customers
      prisma.user.count({
        where: {
          enrollment: {
            some: {},
          },
          // 👇 Uncomment this if you nedd to exclude admins
          // role: Role.user,
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
