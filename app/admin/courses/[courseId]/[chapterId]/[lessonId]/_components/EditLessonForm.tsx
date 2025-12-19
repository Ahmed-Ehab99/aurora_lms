"use client";

import Uploader from "@/app/admin/courses/create/_components/file-uploader/Uploader";
import RichTextEditor from "@/app/admin/courses/create/_components/rich-text-editor/RichTextEditor";
import { AdminLessonSingularType } from "@/app/data/admin/admin-get-lesson";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editLesson } from "../actions";

interface LessonFormProps {
  lesson: AdminLessonSingularType;
  chapterId: string;
  courseId: string;
}

const EditLessonForm = ({ lesson, chapterId, courseId }: LessonFormProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      name: lesson.title,
      description: lesson.description ?? undefined,
      courseId,
      chapterId,
      thumbnailKey: lesson.thumbnailKey ?? undefined,
      videoKey: lesson.videoKey ?? undefined,
    },
  });

  function onSubmit(values: LessonSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        editLesson(values, lesson.id),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div>
      <Button asChild variant="outline" className="mb-6">
        <Link href={`/admin/courses/${courseId}/edit`}>
          <ArrowLeft className="size-4" />
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
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* NAME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DESCRIPTION */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* THUMBNAIL IMAGE */}
              <FormField
                control={form.control}
                name="thumbnailKey"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <Uploader
                        onChange={field.onChange}
                        value={field.value}
                        fileTypeAccepted="image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* VIDEO */}
              <FormField
                control={form.control}
                name="videoKey"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Video File</FormLabel>
                    <FormControl>
                      <Uploader
                        onChange={field.onChange}
                        value={field.value}
                        fileTypeAccepted="video"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SUBMIT BUTTON */}
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    Editing...
                    <Loader className="ml-1 animate-spin" />
                  </>
                ) : (
                  <>Edit Lesson</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditLessonForm;
