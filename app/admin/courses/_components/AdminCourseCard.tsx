import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { ArrowRight, DollarSign, School, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AdminCardMenu from "./AdminCardMenu";

interface AdminCourseCardProps {
  course: AdminCourseType;
  onDelete: (id: string) => void;
}

const AdminCourseCard = ({ course, onDelete }: AdminCourseCardProps) => {
  const {
    duration,
    fileKey,
    id,
    level,
    price,
    slug,
    smallDescription,
    status,
    title,
  } = course;
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
      <div className="absolute top-2 left-2 z-10">
        <span
          className={`rounded-md px-2.5 py-1 text-xs font-semibold ${getStatusStyle()}`}
        >
          {status}
        </span>
      </div>

      <div className="absolute top-2 right-2 z-10">
        <AdminCardMenu id={id} slug={slug} onDelete={onDelete} title={title} />
      </div>

      <Image
        src={thumbnailUrl}
        alt={title}
        width={600}
        height={400}
        className="aspect-video h-full w-full rounded-t-lg object-cover"
      />

      <CardContent className="p-4">
        <p className="group-hover:text-primary line-clamp-2 text-lg font-medium transition-colors">
          {title}
        </p>

        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-tight">
          {smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <DollarSign className="text-primary bg-primary/10 size-6 rounded-md p-1" />
            <p className="text-sm text-white">${price}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <Timer className="text-primary bg-primary/10 size-6 rounded-md p-1" />
            <p className="text-muted-foreground text-sm">{duration}h</p>
          </div>

          <div className="ml-auto flex items-center gap-x-2">
            <School className="text-primary bg-primary/10 size-6 rounded-md p-1" />
            <p className="text-muted-foreground text-sm">{level}</p>
          </div>
        </div>

        <Button asChild className="mt-4 w-full">
          <Link href={`/admin/courses/${id}/edit`}>
            Edit Course <ArrowRight className="size-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminCourseCard;

export const AdminCourseCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="relative gap-0 py-0">
          <div className="absolute top-2 left-2 z-10">
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
          <div className="absolute top-2 right-2 z-10">
            <Skeleton className="size-9 rounded-md" />
          </div>
          <Skeleton className="aspect-video h-full w-full rounded-t-lg object-cover" />
          <CardContent className="p-4">
            <Skeleton className="h-7 w-full" />
            <Skeleton className="mt-2 h-[1.1rem] w-full" />
            <div className="mt-4 flex items-center gap-x-5">
              <div className="flex items-center gap-x-2">
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="flex items-center gap-x-2">
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="ml-auto">
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
            <Skeleton className="mt-4 h-9 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
