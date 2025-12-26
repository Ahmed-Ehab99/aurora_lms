import { UserLessonContentType } from "@/app/data/user/user-get-lesson-content";
import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { Book, CheckCircle } from "lucide-react";

interface LessonContentProps {
  lesson: UserLessonContentType;
}

const LessonContent = ({ lesson }: LessonContentProps) => {
  return (
    <div className="bg-background flex h-full flex-col pl-6">
      <VideoPlayer
        thumbnailKey={lesson.thumbnailKey ?? ""}
        videoKey={lesson.videoKey ?? ""}
      />

      <div className="border-b py-4">
        <Button variant="outline">
          <CheckCircle className="mr-2 size-4 text-green-500" />
          <span>Mark as Complete</span>
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
    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
      <video className="size-full object-cover" controls poster={thumbnailUrl}>
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        Your browser doesn&apos;t support the vedio tag.
      </video>
    </div>
  );
};
