import { UserCourseSidebarType } from "@/app/data/user/user-get-course-sidebar";

interface CourseProgressProps {
  course: UserCourseSidebarType["course"];
}

interface CourseProgressResult {
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

export function useCourseProgress({
  course,
}: CourseProgressProps): CourseProgressResult {
  let totalLessons = 0;
  let completedLessons = 0;

  course.chapter.forEach((chapter) => {
    chapter.lessons.forEach((lesson) => {
      totalLessons++;

      // Check if this lesson is completed
      const isCompleted = lesson.lessonProgress.some(
        (progress) => progress.lessonId === lesson.id && progress.completed,
      );

      if (isCompleted) {
        completedLessons++;
      }
    });
  });

  const progressPercentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return {
    totalLessons,
    completedLessons,
    progressPercentage,
  };
}
