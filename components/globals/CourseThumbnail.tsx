import Image from "next/image";

interface CourseThumbnailProps {
  thumbnailUrl: string;
  alt: string;
}

const CourseThumbnail = ({ thumbnailUrl, alt }: CourseThumbnailProps) => {
  return (
    <Image
      src={thumbnailUrl}
      alt={alt}
      width={600}
      height={400}
      className="aspect-video h-full w-full rounded-t-xl object-cover"
    />
  );
};

export default CourseThumbnail;
