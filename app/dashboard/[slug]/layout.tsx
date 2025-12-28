import { userGetCourseSidebar } from "@/app/data/user/user-get-course-sidebar";
import CourseNavigation from "./_components/CourseNavigation";

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
      {/* Responsive Navigation - Sidebar on desktop, Drawer on mobile */}
      <CourseNavigation course={course.course} />

      {/* Main content 70% */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
