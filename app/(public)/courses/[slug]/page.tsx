import { publicGetCourse } from "@/app/data/public/public-get-course";
import { prisma } from "@/lib/db";
import CourseDetails from "./_components/CourseDetails";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({
    select: {
      slug: true,
    },
  });

  return courses
    .filter((course) => Boolean(course.slug))
    .map((course) => ({
      slug: course.slug!,
    }));
}

export const revalidate = 300; // 5 MIN

const PublicCoursePage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const course = await publicGetCourse(slug);

  return <CourseDetails course={course} />;
};

export default PublicCoursePage;
