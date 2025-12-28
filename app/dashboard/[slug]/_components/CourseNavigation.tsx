import { UserCourseSidebarType } from "@/app/data/user/user-get-course-sidebar";
import CourseDrawer from "./CourseDrawer";
import CourseSidebar from "./CourseSidebar";

interface CourseNavigationProps {
  course: UserCourseSidebarType["course"];
}

const CourseNavigation = ({ course }: CourseNavigationProps) => {
  return (
    <>
      <div className="block md:hidden">
        <CourseDrawer course={course} />
      </div>
      <aside className="border-border hidden min-h-screen w-80 shrink-0 border-r md:block">
        <CourseSidebar course={course} />
      </aside>
    </>
  );
};

export default CourseNavigation;
