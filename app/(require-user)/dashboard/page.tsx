import { userGetAvailableCourses } from "@/app/data/user/user-get-available-courses";
import CourseCard, {
  PaginatedCoursesList,
} from "@/components/globals/CourseCard";
import EmptyState from "@/components/globals/EmptyState";
import { PaginationWrapper } from "@/components/globals/PaginationWrapper";
import { ShoppingBag } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";
import { userGetEnrolledCourses } from "../../data/user/user-get-enrolled-courses";
import CourseProgressCard, {
  CourseProgressCardSkeleton,
} from "./_components/CourseProgressCard";

export const metadata: Metadata = {
  title: "Dashboard",
};

type SearchParams = Promise<{ page?: string }>;

interface PublicCoursesPageProps {
  searchParams: SearchParams;
}

export default async function DashboardPage({
  searchParams,
}: PublicCoursesPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Enrolled Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses you have access to
          </p>
        </div>

        <Suspense
          fallback={
            <CourseProgressCardSkeleton
              className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3"
              count={3}
            />
          }
        >
          <EnrolledCourses />
        </Suspense>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses you can purchase
          </p>
        </div>

        <Suspense
          fallback={
            <PaginatedCoursesList
              className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3"
              count={3}
            />
          }
        >
          <AvailableCourses page={currentPage} />
        </Suspense>
      </section>
    </>
  );
}

async function EnrolledCourses() {
  const enrolledCourses = await userGetEnrolledCourses();

  if (enrolledCourses.length === 0) {
    return (
      <EmptyState
        title="No courses purchased"
        description="You haven't purchased any courses yet"
        buttonText="Browse Courses"
        href="/courses"
        icon={ShoppingBag}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {enrolledCourses.map((course) => (
        <CourseProgressCard key={course.course.id} course={course.course} />
      ))}
    </div>
  );
}

async function AvailableCourses({ page }: { page: number }) {
  const { courses, totalPages, currentPage } =
    await userGetAvailableCourses(page);

  if (courses.length === 0) {
    return (
      <EmptyState
        title="No courses available"
        description="You have already purchased all available courses"
        buttonText="Browse Courses"
        href="/courses"
        icon={ShoppingBag}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <PaginationWrapper totalPages={totalPages} currentPage={currentPage} />
    </>
  );
}
