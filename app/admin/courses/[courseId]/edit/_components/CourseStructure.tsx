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
  DragEndEvent,
  DraggableSyntheticListeners,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
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
import React, { useEffect, useEffectEvent, useState } from "react";
import { toast } from "sonner";
import { reorderChapters, reorderLessons } from "../actions";
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
  const initialItems =
    course.chapter.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: true, // Default Chapter is Open
      lessons: chapter.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.position,
      })),
    })) || [];
  const [items, setItems] = useState(initialItems);

  // To Prevent stale course param
  const syncItemsFromCourse = useEffectEvent(
    (course: AdminCourseSingularType) => {
      setItems((prevItems) => {
        return (
          course.chapter?.map((chapter) => ({
            id: chapter.id,
            title: chapter.title,
            order: chapter.position,
            isOpen:
              prevItems.find((item) => item.id === chapter.id)?.isOpen ?? true,
            lessons: chapter.lessons.map((lesson) => ({
              id: lesson.id,
              title: lesson.title,
              order: lesson.position,
            })),
          })) ?? []
        );
      });
    },
  );

  useEffect(() => {
    syncItemsFromCourse(course);
  }, [course]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    const activeType = active.data.current?.type as "chapter" | "lesson";
    const overType = over.data.current?.type as "chapter" | "lesson";
    const courseId = course.id;

    // check if drag item is chapter, not lesson
    if (activeType === "chapter") {
      let targetChapterId = null;
      if (overType === "chapter") {
        targetChapterId = overId;
      } else if (overType === "lesson") {
        targetChapterId = over.data.current?.chapterId ?? null;
      }
      if (!targetChapterId) {
        toast.error("Couldn't determine the chapter for reordering");
        return;
      }

      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === targetChapterId);

      if (oldIndex === -1 || newIndex === -1) {
        toast.error("Couldn't find chapter old/new index for reordering");
        return;
      }

      const reorderedLocalChapters = arrayMove(items, oldIndex, newIndex);
      const updatedChapterForState = reorderedLocalChapters.map(
        (chapter, index) => ({
          ...chapter,
          order: index + 1,
        }),
      );
      const previousItems = [...items]; // for rollback if there is errors
      setItems(updatedChapterForState);

      if (courseId) {
        const chaptersToUpdate = updatedChapterForState.map((chapter) => ({
          id: chapter.id,
          position: chapter.order,
        }));

        const reorderChaptersPromise = () =>
          reorderChapters(courseId, chaptersToUpdate);

        toast.promise(reorderChaptersPromise(), {
          loading: "Reordering Chapters...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Failed to reorder chapters";
          },
        });
      }

      return;
    }

    // check about the drag item is lesson && the drop place is also a lesson, not chapter
    if (activeType === "lesson" && overType === "lesson") {
      const chapterId = active.data.current?.chapterId;
      const overChapterId = over.data.current?.chapterId;

      // ensure that user should drag & drop lessons in same chapter, not from other chapter
      if (!chapterId || chapterId !== overChapterId) {
        toast.error(
          "Lesson move between different chapters or invalid chapter ID is not allowed.",
        );
        return;
      }

      const chapterIndex = items.findIndex(
        (chapter) => chapter.id === chapterId,
      );

      if (chapterIndex === -1) {
        toast.error("Couldn't find chapter for lesson");
        return;
      }

      const chapterToUpdate = items[chapterIndex];
      const oldLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === active.id,
      );
      const newLessonIndex = chapterToUpdate.lessons.findIndex(
        (lesson) => lesson.id === overId,
      );

      if (oldLessonIndex === -1 || newLessonIndex === -1) {
        toast.error("Couldn't find lesson for reordering");
        return;
      }

      const reorderedLessons = arrayMove(
        chapterToUpdate.lessons,
        oldLessonIndex,
        newLessonIndex,
      );

      const updatedLessonForState = reorderedLessons.map((lesson, index) => ({
        ...lesson,
        order: index + 1,
      }));

      const newItems = [...items];
      newItems[chapterIndex] = {
        ...chapterToUpdate,
        lessons: updatedLessonForState,
      };

      const previousItems = [...items]; // for rollback if there is errors
      setItems(newItems);

      if (courseId) {
        const lessonsToUpdate = updatedLessonForState.map((lesson) => ({
          id: lesson.id,
          position: lesson.order,
        }));

        const reorderLessonsPromise = () =>
          reorderLessons(chapterId, lessonsToUpdate, courseId);

        toast.promise(reorderLessonsPromise(), {
          loading: "Reordering Lessons...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Failed to reorder lessons";
          },
        });
      }

      return;
    }
  }

  function toogleChapter(chapterId: string) {
    setItems(
      items.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter,
      ),
    );
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

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
                      onOpenChange={() => toogleChapter(item.id)}
                    >
                      <div className="border-border flex items-center justify-between border-b p-3">
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost" {...listeners}>
                            <GripVertical className="size-4" />
                          </Button>
                          <CollapsibleTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="flex items-center"
                            >
                              {item.isOpen ? (
                                <ChevronDown className="size-4" />
                              ) : (
                                <ChevronRight className="size-4" />
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
                                        <GripVertical className="size-4" />
                                      </Button>
                                      <FileText className="size-4" />
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
