import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { CourseCardSkeleton } from "@/components/globals/CourseCard";
import EmptyState from "@/components/globals/EmptyState";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import CoursesList from "./_components/CoursesList";

const AdminCoursesPage = () => {
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
        <RenderAdminCourses />
      </Suspense>
    </>
  );
};

export default AdminCoursesPage;

const RenderAdminCourses = async () => {
  const courses = await adminGetCourses();

  return (
    <>
      {courses && courses.length > 0 ? (
        <CoursesList courses={courses} />
      ) : (
        <EmptyState
          title="No courses yet"
          description="Get started by creating your first course. Share your knowledge and
          help others learn something new."
          buttonText="Create Your First Course"
          href="/admin/courses/create"
        />
      )}
    </>
  );
};
