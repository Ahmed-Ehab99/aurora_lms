import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Play } from "lucide-react";
import Link from "next/link";

interface LessonItemProps {
  lesson: {
    id: string;
    title: string;
    description: string | null;
    position: number;
  };
  slug: string;
  isActive?: boolean;
  completed: boolean;
}

const completedStyle =
  "border border-green-300 bg-green-100 text-green-800 hover:bg-green-200 dark:border-green-700 dark:bg-green-900/30 dark:text-gray-200 dark:hover:bg-green-900/50";

const activeStyle =
  "bg-primary/10 dark:bg-primary/20 border-primary/50 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary";

const LessonItem = ({ lesson, slug, isActive, completed }: LessonItemProps) => {
  return (
    <Button
      variant={completed ? "secondary" : "outline"}
      className={cn(
        "h-auto w-full justify-start p-2.5 transition-all",
        completed && completedStyle,
        isActive && !completed && activeStyle,
      )}
      asChild
    >
      <Link href={`/dashboard/${slug}/${lesson.id}`} title={lesson.title}>
        <div className="flex w-full min-w-0 items-center gap-2.5">
          <div className="shrink-0">
            {completed ? (
              <div className="flex size-5 items-center justify-center rounded-full bg-green-600 dark:bg-green-500">
                <Check className="size-3 text-white" />
              </div>
            ) : (
              <div
                className={cn(
                  "bg-background flex size-5 items-center justify-center rounded-full border-2",
                  isActive
                    ? "border-primary bg-primary/10 dark:bg-primary/20"
                    : "border-muted-foreground/60",
                )}
              >
                <Play
                  className={cn(
                    "size-2.5 fill-current",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                />
              </div>
            )}
          </div>

          <div className="flex w-full min-w-0 flex-1 flex-col gap-1 text-left">
            <p
              className={cn(
                "truncate text-xs font-medium",
                completed
                  ? "text-green-800 dark:text-green-200"
                  : isActive
                    ? "text-primary"
                    : "text-foreground",
              )}
            >
              Lesson {lesson.position}: {lesson.title}
            </p>
          </div>
        </div>
      </Link>
    </Button>
  );
};

export default LessonItem;
