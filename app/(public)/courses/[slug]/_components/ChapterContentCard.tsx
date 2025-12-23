import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Play } from "lucide-react";

interface ChapterContentCardProps {
  chapter: {
    id: string;
    title: string;
    lessons: {
      id: string;
      title: string;
    }[];
  };
  index: number;
}

const ChapterContentCard = ({ chapter, index }: ChapterContentCardProps) => {
  return (
    <Card className="gap-0 overflow-hidden border-2 p-0 transition-all duration-200 hover:shadow-md">
      <CollapsibleTrigger>
        <div>
          <CardContent className="hover:bg-muted/50 p-6 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full font-semibold">
                  {index + 1}
                </p>

                <div>
                  <h3 className="text-left text-xl font-semibold">
                    {chapter.title}
                  </h3>

                  <p className="text-muted-foreground mt-1 text-left text-sm">
                    {chapter.lessons.length} Lesson
                    {chapter.lessons.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  {chapter.lessons.length} Lesson
                  {chapter.lessons.length !== 1 ? "s" : ""}
                </Badge>
                <ChevronDown className="text-muted-foreground size-4" />
              </div>
            </div>
          </CardContent>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="bg-muted/20 border-t">
          <div className="space-y-3 p-6 pt-4">
            {chapter.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="hover:bg-accent flex items-center gap-4 rounded-b-xl p-3 transition-colors"
              >
                <div className="bg-background border-primary/20 flex size-8 items-center justify-center rounded-full border-2">
                  <Play className="text-muted-foreground group-hover:text-primary size-4 transition-colors" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium">{lesson.title}</p>

                  <p className="text-muted-foreground mt-1 text-xs">
                    Lesson {index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Card>
  );
};

export default ChapterContentCard;
