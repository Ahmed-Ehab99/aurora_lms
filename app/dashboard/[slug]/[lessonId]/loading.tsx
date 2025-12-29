import { Skeleton } from "@/components/ui/skeleton";

const LessonDetailsSkeleton = () => {
  return (
    <div className="flex h-full flex-col lg:pl-6">
      <Skeleton className="aspect-video overflow-hidden rounded-lg" />
      <div className="border-b py-4">
        <Skeleton className="h-9 w-43" />
      </div>
      <div className="space-y-3 pt-2">
        <Skeleton className="min-h-96 w-full" />
      </div>
    </div>
  );
};

export default LessonDetailsSkeleton;
