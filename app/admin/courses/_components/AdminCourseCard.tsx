import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { ArrowRight, School, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AdminCardMenu from "./AdminCardMenu";

interface AdminCourseCardProps {
  course: AdminCourseType;
}

const AdminCourseCard = ({ course }: AdminCourseCardProps) => {
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

  return (
    <Card className="group relative gap-0 py-0">
      <div className="absolute top-2 right-2 z-10">
        <AdminCardMenu id={id} slug={slug} />
      </div>

      <Image
        src={thumbnailUrl}
        alt={title}
        width={600}
        height={400}
        className="aspect-video h-full w-full rounded-t-lg object-cover"
      />

      <CardContent className="p-4">
        <Link
          href={`/admin/courses/${id}/edit`}
          className="group-hover:text-primary line-clamp-2 text-lg font-medium transition-colors hover:underline"
        >
          {title}
        </Link>

        <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-tight">
          {smallDescription}
        </p>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Timer className="text-primary bg-primary/10 size-6 rounded-md p-1" />
            <p className="text-muted-foreground text-sm">{duration}h</p>
          </div>

          <div className="flex items-center gap-x-2">
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
