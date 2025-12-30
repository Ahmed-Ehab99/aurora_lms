"use client";

import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DraggableSyntheticListeners,
  rectIntersection,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  GripVertical,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useCourseStructure } from "../hooks/use-course-structure";
import CreateChapterModal from "./CreateChapterModal";
import CreateLessonModal from "./CreateLessonModal";
import DeleteChapter from "./DeleteChapter";
import DeleteLesson from "./DeleteLesson";
import EditChapterModal from "./EditChapterModal";

interface CourseStructureProps {
  course: AdminCourseSingularType;
}

interface SortableItemProps {
  id: string;
  children: (listeners: DraggableSyntheticListeners) => React.ReactNode;
  className?: string;
  data?: {
    type: "chapter" | "lesson";
    chapterId?: string; // Only for lessons
  };
}

const CourseStructure = ({ course }: CourseStructureProps) => {
  const { items, sensors, handleDragEnd, toggleChapter } =
    useCourseStructure(course);

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Card>
        <CardHeader className="border-border flex flex-row items-center justify-between border-b">
          <CardTitle>Chapters</CardTitle>
          <CreateChapterModal courseId={course.id} />
        </CardHeader>
        <CardContent className="space-y-6">
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={items.map((item) => item.id)}
          >
            {items.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                data={{ type: "chapter" }}
              >
                {(listeners) => (
                  <Card>
                    <Collapsible
                      open={item.isOpen}
                      onOpenChange={() => toggleChapter(item.id)}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-between p-3",
                          item.isOpen ? "border-border border-b" : "",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost" {...listeners}>
                            <GripVertical size={16} />
                          </Button>

                          <CollapsibleTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="flex items-center"
                            >
                              {item.isOpen ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </Button>
                          </CollapsibleTrigger>

                          <p className="hover:text-primary cursor-pointer pl-2">
                            {item.title}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <EditChapterModal
                            chapterName={item.title}
                            chapterId={item.id}
                            courseId={course.id}
                          />

                          <DeleteChapter
                            chapterId={item.id}
                            courseId={course.id}
                            chapterName={item.title}
                          />
                        </div>
                      </div>

                      <CollapsibleContent>
                        <div className="p-1">
                          <SortableContext
                            items={item.lessons.map((lesson) => lesson.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            {item.lessons.map((lesson) => (
                              <SortableItem
                                key={lesson.id}
                                id={lesson.id}
                                data={{ type: "lesson", chapterId: item.id }}
                              >
                                {(lessonlisteners) => (
                                  <div className="hover:bg-accent flex items-center justify-between rounded-sm p-2">
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        {...lessonlisteners}
                                      >
                                        <GripVertical size={16} />
                                      </Button>

                                      <FileText size={16} />

                                      <Link
                                        href={`/admin/courses/${course.id}/${item.id}/${lesson.id}`}
                                      >
                                        {lesson.title}
                                      </Link>
                                    </div>

                                    <DeleteLesson
                                      chapterId={item.id}
                                      courseId={course.id}
                                      lessonId={lesson.id}
                                      lessonName={lesson.title}
                                    />
                                  </div>
                                )}
                              </SortableItem>
                            ))}
                          </SortableContext>

                          <div className="p-2">
                            <CreateLessonModal
                              chapterId={item.id}
                              courseId={course.id}
                            />
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                )}
              </SortableItem>
            ))}
          </SortableContext>
        </CardContent>
      </Card>
    </DndContext>
  );
};

function SortableItem({ children, id, className, data }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn("touch-none", className, isDragging ? "z-10" : "")}
    >
      {children(listeners)}
    </div>
  );
}

export default CourseStructure;
