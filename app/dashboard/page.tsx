import CourseCard, {
  CourseCardSkeleton,
} from "@/components/globals/CourseCard";
import EmptyState from "@/components/globals/EmptyState";
import { Suspense } from "react";
import { userGetCourses } from "../data/user/user-get-courses";
import {
  userGetEnrolledCourseIds,
  userGetEnrolledCourses,
} from "../data/user/user-get-enrolled-courses";
import CourseProgressCard, {
  CourseProgressCardSkeleton,
} from "./_components/CourseProgressCard";

export default async function DashboardPage() {
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
            <CourseCardSkeleton
              className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3"
              count={3}
            />
          }
        >
          <AvailableCourses />
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

async function AvailableCourses() {
  const [courses, enrolledCourseIds] = await Promise.all([
    userGetCourses(),
    userGetEnrolledCourseIds(),
  ]);

  const remainingCourses = courses.filter(
    (course) => !enrolledCourseIds.includes(course.id),
  );

  if (remainingCourses.length === 0) {
    return (
      <EmptyState
        title="No courses available"
        description="You have already purchased all available courses"
        buttonText="Browse Courses"
        href="/courses"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {remainingCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
