import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <Skeleton className="mb-8 h-18 w-full max-[425px]:h-27 xl:h-10" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-screen w-full rounded-xl" />
      </div>
    </div>
  );
};

export default Loading;
