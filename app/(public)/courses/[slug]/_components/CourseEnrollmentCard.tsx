import { checkIfCourseBought } from "@/app/data/user/user-is-enrolled";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, ChartBar, Check, Clock, LayoutGrid } from "lucide-react";
import Link from "next/link";
import EnrollmentButton from "./EnrollmentButton";

interface CourseEnrollmentCardProps {
  courseId: string;
  price: number;
  duration: number;
  level: string;
  category: string;
  lessonsLength: number;
}

const courseIncludes = [
  "Full lifetime access",
  "Access on mobile and desktop",
  "Certificate of completion",
];

const CourseEnrollmentCard = async ({
  courseId,
  price,
  duration,
  level,
  category,
  lessonsLength,
}: CourseEnrollmentCardProps) => {
  const courseBenefits = [
    {
      icon: Clock,
      label: "Course Duration",
      value: `${duration} hours`,
    },
    {
      icon: ChartBar,
      label: "Difficulty Level",
      value: level,
    },
    {
      icon: LayoutGrid,
      label: "Course Category",
      value: category,
    },
    {
      icon: Book,
      label: "Total Lessons",
      value: `${lessonsLength} Lesson${lessonsLength !== 1 ? "s" : ""}`,
    },
  ];

  const isEnrolled = await checkIfCourseBought(courseId);

  return (
    <div className="lg:sticky lg:top-24">
      <Card className="py-0">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-lg font-medium">Price</span>
            <span className="text-primary text-2xl font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(price)}
            </span>
          </div>

          <div className="bg-muted mb-4 space-y-3 rounded-lg p-4">
            <h4 className="font-medium">What you will get:</h4>

            <ul className="flex flex-col gap-3">
              {courseBenefits.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                    <Icon className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">{label}</p>
                    <p className="text-muted-foreground text-sm">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4 space-y-3">
            <h4>This course includes:</h4>
            <ul className="space-y-3">
              {courseIncludes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <div className="rounded-full bg-green-500/10 p-1 text-green-500">
                    <Check className="size-4" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {isEnrolled ? (
            <Button className="w-full" asChild>
              <Link href="/dashboard">Watch Course</Link>
            </Button>
          ) : (
            <EnrollmentButton courseId={courseId} />
          )}
          <p className="text-muted-foreground mt-3 text-center text-xs">
            30-day money-back gurantee
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseEnrollmentCard;
