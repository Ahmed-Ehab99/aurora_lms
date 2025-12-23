"use client";

import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { BookOpen, Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { enrollmentInCourse } from "../actions";

const EnrollmentButton = ({ courseId }: { courseId: string }) => {
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        enrollmentInCourse(courseId),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "info") {
        toast.info(result.message);
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
    <Button onClick={onSubmit} disabled={isPending} className="w-full">
      {isPending ? (
        <>
          <Loader className="size-4 animate-spin" />
          <span>Enrolling...</span>
        </>
      ) : (
        <>
          <BookOpen className="size-4" />
          <span>Enroll Now!</span>
        </>
      )}
    </Button>
  );
};

export default EnrollmentButton;
