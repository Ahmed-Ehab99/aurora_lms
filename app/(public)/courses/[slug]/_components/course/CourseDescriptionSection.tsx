import RenderDescription from "@/components/rich-text-editor/RenderDescription";
import { Separator } from "@/components/ui/separator";

interface CourseDescriptionSectionProps {
  description: string;
}

const CourseDescriptionSection = ({
  description,
}: CourseDescriptionSectionProps) => {
  return (
    <>
      <Separator className="my-8" />

      <div className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight">
          Course Description
        </h2>

        <RenderDescription json={JSON.parse(description)} />
      </div>
    </>
  );
};

export default CourseDescriptionSection;
