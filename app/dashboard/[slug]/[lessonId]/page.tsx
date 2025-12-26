import { userGetLessonContent } from "@/app/data/user/user-get-lesson-content";
import LessonContent from "./_components/LessonContent";

type Params = Promise<{ lessonId: string }>;

const LessonDetailesPage = async ({ params }: { params: Params }) => {
  const { lessonId } = await params;
  const lesson = await userGetLessonContent(lessonId);

  return <LessonContent lesson={lesson} />;
};

export default LessonDetailesPage;
