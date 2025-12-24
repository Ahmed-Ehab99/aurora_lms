import { prisma } from "@/lib/db";
import { cache } from "react";
import "server-only";
import { requireAdmin } from "./require-admin";

export type TimeRange = "7d" | "30d" | "90d";

export const adminGetEnrollmentsStats = cache(
  async (range: TimeRange = "7d") => {
    await requireAdmin();

    const now = new Date();
    const startDate = new Date();

    let daysToFetch = 7;
    if (range === "30d") {
      daysToFetch = 30;
    } else if (range === "90d") {
      daysToFetch = 90;
    }

    startDate.setDate(now.getDate() - daysToFetch);

    const enrollments = await prisma.enrollment.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const stats: { date: string; enrollments: number }[] = [];

    for (let i = daysToFetch - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);

      stats.push({
        date: date.toISOString().split("T")[0], // yyyy-mm-dd
        enrollments: 0,
      });
    }

    enrollments.forEach((enrollment) => {
      const enrollmentDate = enrollment.createdAt.toISOString().split("T")[0];
      const dayIndex = stats.findIndex((day) => day.date === enrollmentDate);

      if (dayIndex !== -1) {
        stats[dayIndex].enrollments++;
      }
    });

    return stats;
  },
);
