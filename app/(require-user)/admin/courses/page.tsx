import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { CourseCardSkeleton } from "@/components/globals/CourseCard";
import EmptyState from "@/components/globals/EmptyState";
import { PaginationWrapper } from "@/components/globals/PaginationWrapper";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import CoursesList from "./_components/CoursesList";

export const metadata: Metadata = {
  title: "Admin Courses",
};

type SearchParams = Promise<{ page?: string }>;

interface PublicCoursesPageProps {
  searchParams: SearchParams;
}

const AdminCoursesPage = async ({ searchParams }: PublicCoursesPageProps) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Button asChild>
          <Link href="/admin/courses/create">Create Course</Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <CourseCardSkeleton
            count={3}
            className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
          />
        }
      >
        <RenderAdminCourses page={currentPage} />
      </Suspense>
    </>
  );
};

export default AdminCoursesPage;

const RenderAdminCourses = async ({ page }: { page: number }) => {
  const { courses, totalPages, currentPage } = await adminGetCourses(page);

  return (
    <>
      {courses && courses.length > 0 ? (
        <div>
          <CoursesList courses={courses} />
          <PaginationWrapper
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <EmptyState
          title="No courses yet"
          description="Get started by creating your first course. Share your knowledge and
          help others learn something new."
          buttonText="Create Your First Course"
          href="/admin/courses/create"
          icon={Plus}
        />
      )}
    </>
  );
};
