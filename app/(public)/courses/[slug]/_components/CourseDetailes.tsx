import { PublicCourseSingularType } from "@/app/data/public/public-get-course";
import CourseContentSection from "./course/CourseContentSection";
import CourseDescriptionSection from "./course/CourseDescriptionSection";
import CourseEnrollmentCard from "./course/CourseEnrollmentCard";
import CourseHeroSection from "./course/CourseHeroSection";

const CourseDetails = ({ course }: { course: PublicCourseSingularType }) => {
  const {
    category,
    chapter,
    duration,
    fileKey,
    level,
    price,
    description,
    smallDescription,
    title,
  } = course;

  const lessonsLength =
    chapter.reduce((total, chapter) => total + chapter.lessons.length, 0) || 0;

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Main Content */}
      <div className="order-1 lg:col-span-2">
        <CourseHeroSection
          title={title}
          smallDescription={smallDescription}
          fileKey={fileKey}
          level={level}
          category={category}
          duration={duration}
        />

        <CourseDescriptionSection description={description} />

        <CourseContentSection chapters={chapter} />
      </div>

      {/* Enrollment Card */}
      <div className="order-2 lg:col-span-1">
        <CourseEnrollmentCard
          price={price}
          duration={duration}
          level={level}
          category={category}
          lessonsLength={lessonsLength}
        />
      </div>
    </div>
  );
};

export default CourseDetails;
