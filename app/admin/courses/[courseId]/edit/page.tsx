import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prisma } from "@/lib/db";
import CourseStructure from "./_components/CourseStructure";
import EditCourseForm from "./_components/EditCourseForm";

type Params = Promise<{ courseId: string }>;

export async function generateStaticParams() {
  const courses = await prisma.course.findMany({
    select: { id: true },
  });

  return courses.map((course) => ({
    courseId: course.id,
  }));
}

export const revalidate = 300; // 5 MIN

const EditCoursePage = async ({ params }: { params: Params }) => {
  const { courseId } = await params;
  const course = await adminGetCourse(courseId);

  return (
    <div>
      <h1 className="mb-8 flex items-center gap-2 text-3xl font-bold">
        Edit Course:
        <span className="text-primary underline">{course?.title}</span>
      </h1>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic-info" className="cursor-pointer">
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="course-structure" className="cursor-pointer">
            Course Structure
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Edit basic information about the course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm course={course} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>
                Here you can update your course structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CourseStructure course={course} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditCoursePage;
