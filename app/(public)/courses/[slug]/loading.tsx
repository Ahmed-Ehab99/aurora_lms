import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
      <div className="order-1 lg:col-span-2">
        <div className="space-y-8">
          <div className="relative aspect-video w-full rounded-xl shadow-lg">
            <Skeleton className="size-full rounded-xl" />
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-6.5 w-29 rounded-full" />
              <Skeleton className="h-6.5 w-40 rounded-full" />
              <Skeleton className="h-6.5 w-25 rounded-full" />
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="space-y-6">
          <Skeleton className="h-9 w-80" />
          <Skeleton className="min-h-96 w-full" />
        </div>
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-52.5" />
            <Skeleton className="h-9 w-40.5" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-24.5 w-full" />
            ))}
          </div>
        </div>
      </div>

      <div className="order-2 lg:col-span-1">
        <div className="lg:sticky lg:top-24">
          <Card className="py-0">
            <CardContent className="p-6">
              <Skeleton className="mb-4 h-8 w-full" />

              <Skeleton className="mb-4 h-66 w-full rounded-lg p-4" />

              <div className="mb-4 space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>

              <Skeleton className="h-9 w-full" />
              <Skeleton className="mt-3 h-4 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Loading;
