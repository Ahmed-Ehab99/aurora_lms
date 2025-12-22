import { publicGetCourses } from "@/app/data/public/public-get-courses";
import CourseCard, {
  CourseCardSkeleton,
} from "@/components/globals/CourseCard";
import { Suspense } from "react";

const PublicCoursesPage = () => {
  return (
    <div className="mt-5">
      <div className="mb-10 flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses designed to help you achieve your
          learning goals
        </p>
      </div>

      <Suspense fallback={<CourseCardSkeleton />}>
        <RenderPublicCourses />
      </Suspense>
    </div>
  );
};

export default PublicCoursesPage;

const RenderPublicCourses = async () => {
  const courses = await publicGetCourses();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
