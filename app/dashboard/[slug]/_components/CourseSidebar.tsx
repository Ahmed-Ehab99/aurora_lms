"use client";

import { UserCourseSidebarType } from "@/app/data/user/user-get-course-sidebar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Play } from "lucide-react";
import { usePathname } from "next/navigation";
import LessonItem from "./LessonItem";

interface CourseSidebar {
  course: UserCourseSidebarType["course"];
}

const CourseSidebar = ({ course }: CourseSidebar) => {
  const pathname = usePathname();
  const { category, chapter, title } = course;
  const currentLessonId = pathname.split("/").pop();
  const { completedLessons, progressPercentage, totalLessons } =
    useCourseProgress({ course });

  const isChapterCompleted = (
    chapterLessons: (typeof chapter)[0]["lessons"],
  ) => {
    return chapterLessons.every((lesson) =>
      lesson.lessonProgress.some(
        (progress) => progress.lessonId === lesson.id && progress.completed,
      ),
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-border border-b pr-4 pb-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
            <Play className="text-primary size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <h1
              title={title}
              className="truncate text-base leading-tight font-semibold"
            >
              {title}
            </h1>
            <p className="text-muted-foreground mt-1 truncate text-xs">
              {category}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {completedLessons}/{totalLessons} Lessons
            </span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
          <p className="text-muted-foreground text-xs">
            {progressPercentage}% Complete
          </p>
        </div>
      </div>

      <div className="space-y-3 py-4 pr-4">
        {chapter.map((chapter, index) => {
          const chapterCompleted = isChapterCompleted(chapter.lessons);

          return (
            <Collapsible key={chapter.id} defaultOpen={index === 0}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "flex h-auto w-full items-center gap-2 p-3",
                    chapterCompleted &&
                      "border-green-500 bg-green-500 hover:bg-green-600 dark:border-green-600 dark:bg-green-600 dark:hover:bg-green-700",
                  )}
                >
                  <div className="shrink-0">
                    {chapterCompleted ? (
                      <Check className="size-4 text-white" />
                    ) : (
                      <ChevronDown className="text-primary size-4" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <div>
                      <p
                        title={chapter.title}
                        className={cn(
                          "truncate text-sm font-semibold",
                          chapterCompleted ? "text-white" : "text-foreground",
                        )}
                      >
                        {chapter.position}: {chapter.title}
                      </p>
                      <p
                        className={cn(
                          "truncate text-xs font-medium",
                          chapterCompleted
                            ? "text-white/80"
                            : "text-muted-foreground",
                        )}
                      >
                        {chapter.lessons.length} Lessons
                      </p>
                    </div>
                  </div>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 space-y-3 border-l-2 pl-6">
                {chapter.lessons.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    slug={course.slug}
                    isActive={currentLessonId === lesson.id}
                    completed={
                      lesson.lessonProgress.find(
                        (progress) => progress.lessonId === lesson.id,
                      )?.completed || false
                    }
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSidebar;
