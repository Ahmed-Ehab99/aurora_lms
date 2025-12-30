"use client";

import { AdminRecentCoursesType } from "@/app/data/admin/admin-get-recent-courses";
import CourseCard from "@/components/globals/CourseCard";
import { useOptimistic } from "react";

interface RecentCoursesProps {
  courses: AdminRecentCoursesType;
}

export function RecentCourses({ courses }: RecentCoursesProps) {
  const [optimisticCourses, setOptimisticCourses] = useOptimistic(
    courses,
    (state, deletedId: string) => {
      return state.filter((course) => course.id !== deletedId);
    },
  );

  const handleDelete = (id: string) => {
    setOptimisticCourses(id);
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
      {optimisticCourses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isInAdmin={true}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
