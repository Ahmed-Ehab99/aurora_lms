import { AdminCourseSingularType } from "@/app/data/admin/admin-get-course";
import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useEffect, useEffectEvent, useState } from "react";
import { toast } from "sonner";
import { reorderChapters, reorderLessons } from "../actions";

interface ChapterItem {
  id: string;
  title: string;
  order: number;
  isOpen: boolean;
  lessons: LessonItem[];
}

interface LessonItem {
  id: string;
  title: string;
  order: number;
}

export function useCourseStructure(course: AdminCourseSingularType) {
  const initialItems =
    course.chapter.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: true,
      lessons: chapter.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.position,
      })),
    })) || [];

  const [items, setItems] = useState<ChapterItem[]>(initialItems);

  // Sync items from course to prevent stale data
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

  // Toggle chapter open/closed
  const toggleChapter = (chapterId: string) => {
    setItems(
      items.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter,
      ),
    );
  };

  // Handle chapter reordering
  const handleChapterReorder = async (
    activeId: string | number,
    targetChapterId: string | number,
  ) => {
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

    const previousItems = [...items];
    setItems(updatedChapterForState);

    const chaptersToUpdate = updatedChapterForState.map((chapter) => ({
      id: chapter.id,
      position: chapter.order,
    }));

    const reorderChaptersPromise = () =>
      reorderChapters(course.id, chaptersToUpdate);

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
  };

  // Handle lesson reordering
  const handleLessonReorder = async (
    activeId: string | number,
    overId: string | number,
    chapterId: string,
  ) => {
    const chapterIndex = items.findIndex((chapter) => chapter.id === chapterId);

    if (chapterIndex === -1) {
      toast.error("Couldn't find chapter for lesson");
      return;
    }

    const chapterToUpdate = items[chapterIndex];
    const oldLessonIndex = chapterToUpdate.lessons.findIndex(
      (lesson) => lesson.id === activeId,
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

    const previousItems = [...items];
    setItems(newItems);

    const lessonsToUpdate = updatedLessonForState.map((lesson) => ({
      id: lesson.id,
      position: lesson.order,
    }));

    const reorderLessonsPromise = () =>
      reorderLessons(chapterId, lessonsToUpdate, course.id);

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
  };

  // Main drag end handler
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    const activeType = active.data.current?.type as "chapter" | "lesson";
    const overType = over.data.current?.type as "chapter" | "lesson";

    // Chapter reordering
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

      handleChapterReorder(activeId, targetChapterId);
      return;
    }

    // Lesson reordering
    if (activeType === "lesson" && overType === "lesson") {
      const chapterId = active.data.current?.chapterId;
      const overChapterId = over.data.current?.chapterId;

      if (!chapterId || chapterId !== overChapterId) {
        toast.error(
          "Lesson move between different chapters or invalid chapter ID is not allowed.",
        );
        return;
      }

      handleLessonReorder(activeId, overId, chapterId);
      return;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return {
    items,
    sensors,
    handleDragEnd,
    toggleChapter,
  };
}
