import { userGetCourseSidebar } from "@/app/data/user/user-get-course-sidebar";
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
    <div className="flex h-full flex-col items-center justify-center space-y-2 text-center">
      <h2 className="text-2xl font-bold">No Lessons Available</h2>
      <p className="text-muted-foreground">
        This course doesn&apos;t have any lessons yet!
      </p>
    </div>
  );
};

export default CourseViewPage;
