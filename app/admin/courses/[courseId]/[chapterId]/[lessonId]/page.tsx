import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import EditLessonForm from "./_components/EditLessonForm";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

const EditLessonPage = async ({ params }: { params: Params }) => {
  const { chapterId, courseId, lessonId } = await params;
  const lesson = await adminGetLesson(lessonId);

  return (
    <EditLessonForm chapterId={chapterId} lesson={lesson} courseId={courseId} />
  );
};

export default EditLessonPage;
