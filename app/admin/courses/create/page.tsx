import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home } from "lucide-react";
import Link from "next/link";
import CreateCourseForm from "./_components/CreateCourseForm";

const CourseCreationPage = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/">
            <Home className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Create Courses</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide basic information about the course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateCourseForm />
        </CardContent>
      </Card>
    </>
  );
};

export default CourseCreationPage;
