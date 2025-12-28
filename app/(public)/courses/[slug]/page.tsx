import { userGetCourse } from "@/app/data/user/user-get-course";
import { prisma } from "@/lib/db";
import { Metadata } from "next";
import CourseDetails from "./_components/CourseDetails";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await userGetCourse(slug);

  return {
    title: course.title,
  };
}

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

const PublicCoursePage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const course = await userGetCourse(slug);

  return <CourseDetails course={course} />;
};

export default PublicCoursePage;
