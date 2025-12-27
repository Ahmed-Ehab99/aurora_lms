"use client";

import { UserEnrolledCoursesType } from "@/app/data/user/user-get-enrolled-courses";
import CourseThumbnail from "@/components/globals/CourseThumbnail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { useCourseProgress } from "@/hooks/use-course-progress";
import Link from "next/link";

interface CourseProgressCardProps {
  course: UserEnrolledCoursesType["course"];
}

const CourseProgressCard = ({ course }: CourseProgressCardProps) => {
  const { fileKey, slug, smallDescription, title, level } = course;

  const thumbnailUrl = useConstructUrl(fileKey);
  const { completedLessons, progressPercentage, totalLessons } =
    useCourseProgress({ course });

  return (
    <Card className="group relative gap-0 py-0">
      <div className="absolute top-2 right-2 z-10">
        <Badge className="px-2.5 py-1 text-xs font-semibold">{level}</Badge>
      </div>

      <CourseThumbnail thumbnailUrl={thumbnailUrl} alt={title} />

      <CardContent className="space-y-4 p-4">
        <div className="space-y-2">
          <p className="group-hover:text-primary truncate text-lg font-medium transition-colors">
            {title}
          </p>

          <p className="text-muted-foreground line-clamp-2 text-sm leading-tight wrap-break-word whitespace-normal">
            {smallDescription}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <p>Progress:</p>
              <p className="font-medium">{progressPercentage}%</p>
            </div>

            <Progress value={progressPercentage} className="h-1.5" />
          </div>

          <p className="text-muted-foreground text-xs">
            {completedLessons} of {totalLessons} Lessons Completed
          </p>
        </div>

        <Button asChild className="w-full">
          <Link href={`/dashboard/${slug}`}>
            {progressPercentage > 0 ? (
              <>Continue Learning</>
            ) : (
              <>Start Learning</>
            )}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export const CourseProgressCardSkeleton = ({
  className,
  count,
}: {
  className: string;
  count: number;
}) => {
  return (
    <div className={`${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="group relative gap-0 py-0">
          <Skeleton className="aspect-video h-full w-full rounded-t-xl object-cover" />
          <CardContent className="space-y-4 p-4">
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-15" />
                  <Skeleton className="size-5" />
                </div>
                <Skeleton className="h-1.5 w-full rounded-full" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseProgressCard;
