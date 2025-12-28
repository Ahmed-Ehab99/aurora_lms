import { userGetLessonContent } from "@/app/data/user/user-get-lesson-content";
import { Metadata } from "next";
import LessonContent from "./_components/LessonContent";

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
  };
}

const LessonDetailesPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;
  const lesson = await userGetLessonContent(lessonId);

  return <LessonContent lesson={lesson} />;
};

export default LessonDetailesPage;
