import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AdminCourseCard from "./_components/AdminCourseCard";

const CoursesPage = async () => {
  const data = await adminGetCourses();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>
        <Button asChild>
          <Link href="/admin/courses/create">Create Course</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {data.map((course) => (
          <AdminCourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
};

export default CoursesPage;
