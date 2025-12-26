import CourseCard from "@/components/globals/CourseCard";
import EmptyState from "@/components/globals/EmptyState";
import Link from "next/link";
import { userGetCourses } from "../data/user/user-get-courses";
import { userGetEnrolledCourses } from "../data/user/user-get-enrolled-courses";

export default async function DashboardPage() {
  const [courses, enrolledCourses] = await Promise.all([
    userGetCourses(),
    userGetEnrolledCourses(),
  ]);

  const coursesUserEnrolled = courses.filter(
    (course) =>
      !enrolledCourses.some(
        ({ course: enrolled }) => enrolled.id === course.id,
      ),
  );

  const remainingCourses = courses.filter(
    (course) =>
      !enrolledCourses.some(
        ({ course: enrolled }) => enrolled.id === course.id,
      ),
  );

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Enrolled Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses you have access to
          </p>
        </div>

        {enrolledCourses.length === 0 ? (
          <EmptyState
            title="No courses purchased"
            description="You haven't purchased any courses yet"
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {enrolledCourses.map((course) => (
              <Link
                key={course.course.id}
                href={`/dashboard/${course.course.slug}`}
              >
                {course.course.title}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-muted-foreground">
            Here you can see all the courses you have purchase
          </p>
        </div>

        {/* If user purchase all existing courses, render EmptyState  */}
        {/* If not, render remaining courses */}
        {coursesUserEnrolled.length === 0 ? (
          <EmptyState
            title="No courses available"
            description="You have already purchase all available courses"
            buttonText="Browse Courses"
            href="/courses"
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {remainingCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
