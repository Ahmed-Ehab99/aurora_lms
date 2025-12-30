"use client";

import { UserCourseSidebarType } from "@/app/data/user/user-get-course-sidebar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Menu, Play } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LessonItem from "./LessonItem";

interface CourseDrawerProps {
  course: UserCourseSidebarType["course"];
}

const CourseDrawer = ({ course }: CourseDrawerProps) => {
  const [open, setOpen] = useState(false);
  const { completedLessons, progressPercentage, totalLessons } =
    useCourseProgress({ course });
  const pathname = usePathname();
  const currentLessonId = pathname.split("/").pop();
  const { category, chapter, title } = course;

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
    <Drawer open={open} onOpenChange={setOpen}>
      {/* Floating Trigger Button */}
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="fixed right-4 bottom-4 z-50 size-10 rounded-full shadow-lg md:hidden"
          aria-label="Open course menu"
        >
          <Menu size={16} />
        </Button>
      </DrawerTrigger>

      {/* Drawer Content */}
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
              <Play size={16} className="text-primary" />
            </div>
            <div className="flex flex-col space-y-1">
              <DrawerTitle className="text-left">{title}</DrawerTitle>
              <p className="text-muted-foreground text-sm">{category}</p>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="font-medium">
                {completedLessons}/{totalLessons} Lessons
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-muted-foreground text-xs">
              {progressPercentage}% Complete
            </p>
          </div>
        </DrawerHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4">
          <div className="space-y-3">
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
                          <Check size={16} className="text-white" />
                        ) : (
                          <ChevronDown size={16} className="text-primary" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <p
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
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-3 border-l-2 pl-6">
                    {chapter.lessons.map((lesson) => (
                      <div key={lesson.id} onClick={() => setOpen(false)}>
                        <LessonItem
                          lesson={lesson}
                          slug={course.slug}
                          isActive={currentLessonId === lesson.id}
                          completed={
                            lesson.lessonProgress.find(
                              (progress) => progress.lessonId === lesson.id,
                            )?.completed || false
                          }
                        />
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CourseDrawer;
