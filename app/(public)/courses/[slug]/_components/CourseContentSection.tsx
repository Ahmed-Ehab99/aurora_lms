import { Collapsible } from "@/components/ui/collapsible";
import ChapterContentCard from "./ChapterContentCard";

interface Chapter {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
  }[];
}

interface CourseContentSectionProps {
  chapters: Chapter[];
}

const CourseContentSection = ({ chapters }: CourseContentSectionProps) => {
  const lessonsLength =
    chapters.reduce((total, chapter) => total + chapter.lessons.length, 0) || 0;

  return (
    <div className="mt-12 space-y-6">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-0">
        <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
          Course Content
        </h2>
        <span className="text-sm md:text-lg">
          {chapters.length} Chapter{chapters.length !== 1 ? "s" : ""} |{" "}
          {lessonsLength} Lesson{lessonsLength !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-4">
        {chapters.map((chapter, index) => (
          <Collapsible key={chapter.id} defaultOpen={index === 0}>
            <ChapterContentCard chapter={chapter} index={index} />
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default CourseContentSection;
