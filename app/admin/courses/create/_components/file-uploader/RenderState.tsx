import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CloudUpload, ImageIcon, Loader, X } from "lucide-react";
import Image from "next/image";

export const RenderEmptyState = ({
  isDragActive,
}: {
  isDragActive: boolean;
}) => {
  return (
    <div className="text-center">
      <div className="bg-muted mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
        <CloudUpload
          className={cn(
            "text-muted-foreground size-6",
            isDragActive && "text-primary",
          )}
        />
      </div>
      <p className="text-foreground text-base font-semibold">
        Drop your files here or{" "}
        <span className="text-primary cursor-pointer font-bold">
          click to upload
        </span>
      </p>
    </div>
  );
};

export const RenderErrorState = () => {
  return (
    <div className="text-center">
      <div className="bg-destructive/30 mx-auto mb-4 flex size-12 items-center justify-center rounded-full">
        <ImageIcon className={cn("text-destructive size-6")} />
      </div>
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-muted-foreground mt-1 text-xs">Something went wrong</p>
      <Button type="button" className="mt-4">
        Retry File Selection
      </Button>
    </div>
  );
};

export const RenderUploadedState = ({
  previewUrl,
  isDeleting,
  handleRemoveFile,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
}) => {
  return (
    <div>
      <Image
        src={previewUrl}
        alt="Uploaded File"
        fill
        className="object-contain p-2"
      />
      <Button
        variant="destructive"
        size="icon"
        onClick={handleRemoveFile}
        disabled={isDeleting}
        className={cn("absolute top-4 right-4")}
      >
        {isDeleting ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <X className="size-4" />
        )}
      </Button>
    </div>
  );
};

export const RenderUploadingState = ({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <p>{progress}</p>
      <p className="text-foreground mt-2 text-sm font-medium">Uploading...</p>
      <p className="text-muted-foreground mt-1 max-w-xs truncate text-sm">
        {file.name}
      </p>
    </div>
  );
};
