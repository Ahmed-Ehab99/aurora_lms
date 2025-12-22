import { publicGetCourse } from "@/app/data/public/public-get-course";

import CourseDetailes from "./_components/CourseDetailes";

const PublicCoursePage = async ({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) => {
  const { slug } = await params;
  const course = await publicGetCourse(slug);

  return <CourseDetailes course={course} />;
};

export default PublicCoursePage;
