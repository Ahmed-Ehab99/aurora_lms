import { SectionCards } from "@/components/dashboard-layout/section-cards";
import { CourseCardSkeleton } from "@/components/globals/CourseCard";
import EmptyState from "@/components/globals/EmptyState";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { adminGetEnrollmentsStats } from "../../data/admin/admin-get-enrollments-stats";
import { adminGetRecentCourses } from "../../data/admin/admin-get-recent-courses";
import { EnrollmentsChart } from "./_components/EnrollmentChart";
import { RecentCourses } from "./_components/RecentCourses";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  const [data7d, data30d, data90d] = await Promise.all([
    adminGetEnrollmentsStats("7d"),
    adminGetEnrollmentsStats("30d"),
    adminGetEnrollmentsStats("90d"),
  ]);

  return (
    <>
      <SectionCards />
      <EnrollmentsChart
        enrollmentsData={{
          "7d": data7d,
          "30d": data30d,
          "90d": data90d,
        }}
      />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Button variant="outline" asChild>
            <Link href="/admin/courses">View All Courses</Link>
          </Button>
        </div>

        <Suspense
          fallback={
            <CourseCardSkeleton
              count={2}
              className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2"
            />
          }
        >
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
}

const RenderRecentCourses = async () => {
  const recentCourses = await adminGetRecentCourses();
  if (recentCourses.length === 0) {
    return (
      <EmptyState
        buttonText="Create New Course"
        description="You don't have any courses. Create some to see them here"
        href="/admin/courses/create"
        title="You don't have any course yet!"
        icon={Plus}
      />
    );
  }

  return <RecentCourses courses={recentCourses} />;
};
