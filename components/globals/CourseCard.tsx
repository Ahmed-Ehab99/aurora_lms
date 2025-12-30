import AdminCardMenu from "@/app/(require-user)/admin/courses/_components/AdminCardMenu";
import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { UserCourseType } from "@/app/data/user/user-get-courses";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { ArrowRight, DollarSign, School, Timer } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import CourseThumbnail from "./CourseThumbnail";

// discriminated union type
type CourseCardProps =
  | {
      course: AdminCourseType;
      isInAdmin: true;
      onDelete: (id: string) => void; // Required when isInAdmin is true
    }
  | {
      course: UserCourseType;
      isInAdmin?: false;
      onDelete?: never; // Not allowed when isInAdmin is false
    };

const CourseCard = ({ course, isInAdmin, onDelete }: CourseCardProps) => {
  const {
    fileKey,
    id,
    slug,
    smallDescription,
    title,
    status,
    level,
    price,
    duration,
  } = course;
  // Type guard for category
  const category = "category" in course ? course.category : null;

  const thumbnailUrl = useConstructUrl(fileKey);

  const getStatusStyle = () => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-500/90 text-white";
      case "draft":
        return "bg-yellow-500/90 text-white";
      case "archived":
        return "bg-gray-500/90 text-white";
      default:
        return "bg-blue-500/90 text-white";
    }
  };

  return (
    <Card className="group relative gap-0 py-0">
      {isInAdmin && (
        <div className="absolute top-2 left-2 z-10">
          <Badge
            className={`px-2.5 py-1 text-xs font-semibold ${getStatusStyle()}`}
          >
            {status}
          </Badge>
        </div>
      )}

      <div className="absolute top-2 right-2 z-10">
        {isInAdmin ? (
          <AdminCardMenu
            id={id}
            slug={slug}
            onDelete={onDelete}
            title={title}
          />
        ) : (
          <Badge className="px-2.5 py-1 text-xs font-semibold">
            {category}
          </Badge>
        )}
      </div>

      <CourseThumbnail thumbnailUrl={thumbnailUrl} alt={title} />

      <CardContent className="space-y-4 p-4">
        <p className="group-hover:text-primary truncate text-lg font-medium transition-colors">
          {title}
        </p>

        <p className="text-muted-foreground line-clamp-2 text-sm leading-tight wrap-break-word whitespace-normal">
          {smallDescription}
        </p>

        <div className="flex flex-wrap justify-between gap-y-5">
          <div className="flex items-center gap-x-2">
            <DollarSign
              size={24}
              className="text-primary bg-primary/10 rounded-md p-1"
            />
            <p className="text-sm text-white">${price}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <Timer
              size={24}
              className="text-primary bg-primary/10 rounded-md p-1"
            />
            <p className="text-muted-foreground text-sm">{duration}h</p>
          </div>

          <div className="flex items-center gap-x-2">
            <School
              size={24}
              className="text-primary bg-primary/10 rounded-md p-1"
            />
            <p className="text-muted-foreground text-sm">{level}</p>
          </div>
        </div>

        <Button asChild className="w-full">
          {isInAdmin ? (
            <Link href={`/admin/courses/${id}/edit`}>
              Edit Course <ArrowRight size={16} />
            </Link>
          ) : (
            <Link href={`/courses/${slug}`}>Explore Course</Link>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export const CourseCardSkeleton = ({
  className,
  count,
}: {
  className: string;
  count: number;
}) => {
  return (
    <div className={`${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="relative gap-0 py-0">
          <Skeleton className="aspect-video h-full w-full rounded-t-xl object-cover" />
          <CardContent className="space-y-4 p-4">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="h-9 w-full" />
            <div className="flex flex-wrap justify-between gap-y-5">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-28" />
            </div>
            <Skeleton className="h-9 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseCard;
