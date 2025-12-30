import { userGetCourseSidebar } from "@/app/data/user/user-get-course-sidebar";
import EmptyState from "@/components/globals/EmptyState";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await userGetCourseSidebar(slug);

  return {
    title: course.course.title,
  };
}

const CourseViewPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const course = await userGetCourseSidebar(slug);

  const firstChapter = course.course.chapter[0];
  const firstLesson = firstChapter.lessons[0];

  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }

  return (
    <EmptyState
      title="No lessons available"
      description="This course doesn't have any lessons yet.
        Please check back later."
      buttonText="Back to Dashboard"
      href="/dashboard"
      icon={ArrowLeft}
      className="bg-muted absolute inset-0 z-900 justify-center"
    />
  );
};

export default CourseViewPage;
