"use client";

import Uploader from "@/app/admin/courses/create/_components/file-uploader/Uploader";
import { AdminLessonSingularType } from "@/app/data/admin/admin-get-lesson";
import RichTextEditor from "@/components/rich-text-editor/RichTextEditor";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader } from "lucide-react";
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
              <Loader className="size-4 animate-spin" />
              <span>Editing...</span>
            </>
          ) : (
            <>
              <Edit className="size-4" />
              <span>Edit Lesson</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditLessonForm;

export const EditLessonFormSkeleton = () => {
  return (
    <div className="px-6">
      <Skeleton className="h-screen w-full" />
    </div>
  );
};
