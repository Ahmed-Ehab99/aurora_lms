"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { cn } from "@/lib/utils";
import { useFileUploader } from "../../hooks/use-file-uploader";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from "./RenderState";
import { Input } from "@/components/ui/input";

interface UploaderProps {
  value?: string;
  onChange?: (value: string) => void;
  fileTypeAccepted: "image" | "video";
}

const Uploader = ({ value, onChange, fileTypeAccepted }: UploaderProps) => {
  const fileUrl = useConstructUrl(value || "");

  const {
    fileState,
    getRootProps,
    getInputProps,
    isDragActive,
    handleRemoveFile,
    open
  } = useFileUploader({
    value,
    onChange,
    fileTypeAccepted,
    fileUrl,
  });

  const renderContent = () => {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          file={fileState.file as File}
          progress={fileState.progress}
        />
      );
    }
    if (fileState.error) {
      return <RenderErrorState onRetry={open} />;
    }
    if (fileState.objectUrl) {
      return (
        <RenderUploadedState
          previewUrl={fileState.objectUrl}
          handleRemoveFile={handleRemoveFile}
          isDeleting={fileState.isDeleting}
          fileType={fileState.fileType}
        />
      );
    }
    return <RenderEmptyState isDragActive={isDragActive} />;
  };

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative h-96 w-full border-2 border-dashed transition-colors duration-200 ease-in-out",
        isDragActive
          ? "border-primary bg-primary/10 border-solid"
          : "border-border hover:border-primary",
      )}
    >
      <CardContent className="flex size-full items-center justify-center">
        <Input {...getInputProps()} />
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default Uploader;
