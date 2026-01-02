import { userGetLessonContent } from "@/app/data/user/user-get-lesson-content";
import { Metadata } from "next";
import LessonContent from "./_components/LessonContent";

// We can't use generateStaticParams() here because the userGetLessonContent() uses requireUser() which uses headers()
// This mean that this route requires runtime information (user session)

type Params = Promise<{ lessonId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = await userGetLessonContent(lessonId);

  return {
    title: lesson.title,
    description: lesson.description,
  };
}

const LessonDetailesPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;
  const lesson = await userGetLessonContent(lessonId);

  return <LessonContent lesson={lesson} />;
};

export default LessonDetailesPage;
