import { Badge } from "@/components/ui/badge";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { ChartBar, Clock, LayoutGrid } from "lucide-react";
import Image from "next/image";

interface CourseHeroSectionProps {
  title: string;
  smallDescription: string;
  fileKey: string;
  level: string;
  category: string;
  duration: number;
}

const CourseHeroSection = ({
  title,
  smallDescription,
  fileKey,
  level,
  category,
  duration,
}: CourseHeroSectionProps) => {
  const thumbnailUrl = useConstructUrl(fileKey);

  return (
    <div className="space-y-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          priority
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h1
            title={title}
            className="line-clamp-2 text-2xl font-bold tracking-tight wrap-break-word whitespace-normal md:text-4xl"
          >
            {title}
          </h1>
          <p
            title={smallDescription}
            className="text-muted-foreground line-clamp-2 text-sm leading-relaxed wrap-break-word whitespace-normal md:text-lg"
          >
            {smallDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Badge className="flex items-center gap-1.5 px-3 py-1">
            <ChartBar className="size-4" />
            <span>{level}</span>
          </Badge>
          <Badge className="flex items-center gap-1.5 px-3 py-1">
            <LayoutGrid className="size-4" />
            <span>{category}</span>
          </Badge>
          <Badge className="flex items-center gap-1.5 px-3 py-1">
            <Clock className="size-4" />
            <span>{duration} hours</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default CourseHeroSection;
