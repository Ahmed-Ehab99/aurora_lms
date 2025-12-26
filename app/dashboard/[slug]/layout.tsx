import { userGetCourseSidebar } from "@/app/data/user/user-get-course-sidebar";
import CourseSidebar from "./_components/CourseSidebar";

type Params = Promise<{ slug: string }>;

export default async function CourseLayout({
  params,
  children,
}: Readonly<{
  params: Params;
  children: React.ReactNode;
}>) {
  const { slug } = await params;
  const course = await userGetCourseSidebar(slug);

  return (
    <div className="flex flex-1">
      {/* Sidebar 30% */}
      <div className="border-border w-80 shrink-0 border-r">
        <CourseSidebar course={course.course} />
      </div>

      {/* Main content 70% */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
