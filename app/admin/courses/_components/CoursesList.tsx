"use client";

import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import AdminCourseCard from "./AdminCourseCard";
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
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
      {optimisticCourses.map((course) => (
        <AdminCourseCard
          key={course.id}
          course={course}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default CoursesList;
