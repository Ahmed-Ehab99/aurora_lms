import { userGetCourses } from "@/app/data/user/user-get-courses";
import CourseCard, {
  CourseCardSkeleton,
} from "@/components/globals/CourseCard";
import EmptyState from "@/components/globals/EmptyState";
import { PaginationWrapper } from "@/components/globals/PaginationWrapper";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Courses",
};

type SearchParams = Promise<{ page?: string }>;

interface PublicCoursesPageProps {
  searchParams: SearchParams;
}

const PublicCoursesPage = async ({ searchParams }: PublicCoursesPageProps) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  return (
    <div className="my-10">
      <div className="mb-10 flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
          Explore Courses
        </h1>
        <p className="text-muted-foreground">
          Discover our wide range of courses designed to help you achieve your
          learning goals
        </p>
      </div>

      <Suspense
        fallback={
          <CourseCardSkeleton
            count={3}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          />
        }
      >
        <RenderPublicCourses page={currentPage} />
      </Suspense>
    </div>
  );
};

export default PublicCoursesPage;

const RenderPublicCourses = async ({ page }: { page: number }) => {
  const { courses, totalPages, currentPage } = await userGetCourses(page);

  if (courses.length === 0) {
    return (
      <EmptyState
        title="Your learning journey starts soon"
        description="There are no courses available right now."
        buttonText="Return Home"
        href="/"
        icon={ArrowLeft}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <PaginationWrapper totalPages={totalPages} currentPage={currentPage} />
    </>
  );
};
