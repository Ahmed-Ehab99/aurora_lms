"use client";

import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import CourseCard from "@/components/globals/CourseCard";
import { useOptimistic } from "react";

interface CoursesClientListProps {
  courses: AdminCourseType[];
}

const CoursesList = ({ courses }: CoursesClientListProps) => {
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
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
};

export default CoursesList;
