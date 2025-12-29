"use client";

import { UserLessonContentType } from "@/app/data/user/user-get-lesson-content";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { confettiStars } from "@/components/ui/confetti";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { cn } from "@/lib/utils";
import { Book, CheckCircle, Loader } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { markLessonComplete } from "../actions";

interface LessonContentProps {
  lesson: UserLessonContentType;
}

const LessonContent = ({ lesson }: LessonContentProps) => {
  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(lesson.id, lesson.chapter.course.slug),
      );

      if (error) {
        toast.error("An unexpected error occurred. Please try again.");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
        confettiStars();
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="bg-background flex h-full flex-col lg:pl-6">
      <div className="bg-background sticky top-4 z-50 md:top-6 md:static">
        <VideoPlayer
          thumbnailKey={lesson.thumbnailKey ?? ""}
          videoKey={lesson.videoKey ?? ""}
        />
      </div>

      <div className="border-b py-4">
        <Button
          variant="outline"
          onClick={onSubmit}
          disabled={isPending}
          className={cn(lesson.lessonProgress.length > 0 && "bg-green-500/10")}
        >
          {isPending ? (
            <>
              <Loader className="size-4 animate-spin text-green-500" />
              <span>Marking...</span>
            </>
          ) : lesson.lessonProgress.length > 0 ? (
            <>
              <CheckCircle className="size-4 text-green-500" />
              <span className="text-green-500">Completed</span>
            </>
          ) : (
            <>
              <CheckCircle className="size-4 text-green-500" />
              <span>Mark as Complete</span>
            </>
          )}
        </Button>
      </div>

      <div className="space-y-3 pt-2">
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          {lesson.title}
        </h1>
        {lesson.description && (
          <RenderDescription json={JSON.parse(lesson.description)} />
        )}
      </div>
    </div>
  );
};

export default LessonContent;

const VideoPlayer = ({
  thumbnailKey,
  videoKey,
}: {
  thumbnailKey: string;
  videoKey: string;
}) => {
  const videoUrl = useConstructUrl(videoKey);
  const thumbnailUrl = useConstructUrl(thumbnailKey);

  if (!videoKey) {
    return (
      <div className="bg-muted flex aspect-video flex-col items-center justify-center rounded-lg">
        <Book className="text-primary mx-auto mb-4 size-16" />
        <p className="text-muted-foreground">
          This lesson doesn&apos;t have a video yet!
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-lg bg-black">
      <video className="size-full object-cover" controls poster={thumbnailUrl}>
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        Your browser doesn&apos;t support the vedio tag.
      </video>
    </div>
  );
};
