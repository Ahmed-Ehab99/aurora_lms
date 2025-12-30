"use client";

import { UserLessonContentType } from "@/app/data/user/user-get-lesson-content";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { confettiStars } from "@/components/ui/confetti";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { cn } from "@/lib/utils";
import { Book, CheckCircle, Loader, Play } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
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
      <div className="bg-background sticky top-4 z-50 md:static md:top-6">
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
              <Loader size={16} className="animate-spin text-green-500" />
              <span>Marking...</span>
            </>
          ) : lesson.lessonProgress.length > 0 ? (
            <>
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-green-500">Completed</span>
            </>
          ) : (
            <>
              <CheckCircle size={16} className="text-green-500" />
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
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="relative size-full"
        >
          {/* Poster as LCP element */}
          <Image
            src={thumbnailUrl}
            alt="Lesson video"
            className="size-full object-cover"
            loading="eager"
            width={500}
            height={400}
            fetchPriority="high"
          />

          {/* Play overlay */}
          <div className="absolute inset-0 grid place-items-center bg-black/30">
            <div className="bg-primary cursor-pointer rounded-full p-3 md:p-4">
              <Play size={16} className="text-white" />
            </div>
          </div>
        </button>
      ) : (
        <video
          className="size-full object-cover"
          controls
          autoPlay
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
