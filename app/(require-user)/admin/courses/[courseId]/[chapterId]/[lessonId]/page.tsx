import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import EditLessonForm, {
  EditLessonFormSkeleton,
} from "./_components/EditLessonForm";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = await adminGetLesson(lessonId);

  return {
    title: lesson.title,
  };
}

const EditLessonPage = async ({ params }: { params: Params }) => {
  const { chapterId, courseId, lessonId } = await params;

  return (
    <div>
      <Button asChild variant="outline" className="mb-6">
        <Link href={`/admin/courses/${courseId}/edit`}>
          <ArrowLeft size={16} />
          Go Back
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Configuration</CardTitle>
          <CardDescription>
            Configure the video and description for this lesson
          </CardDescription>
        </CardHeader>
        <Suspense fallback={<EditLessonFormSkeleton />}>
          <RenderEditLessonForm
            chapterId={chapterId}
            courseId={courseId}
            lessonId={lessonId}
          />
        </Suspense>
      </Card>
    </div>
  );
};

export default EditLessonPage;

interface RenderEditLessonFormProps {
  lessonId: string;
  chapterId: string;
  courseId: string;
}

const RenderEditLessonForm = async ({
  lessonId,
  chapterId,
  courseId,
}: RenderEditLessonFormProps) => {
  const lesson = await adminGetLesson(lessonId);
  return (
    <CardContent>
      <EditLessonForm
        chapterId={chapterId}
        lesson={lesson}
        courseId={courseId}
      />
    </CardContent>
  );
};
