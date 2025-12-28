import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShineBorder } from "@/components/ui/shine-border";
import { TextAnimate } from "@/components/ui/text-animate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

interface FeaturesT {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const features: FeaturesT[] = [
  {
    id: 1,
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses designed by industry experts.",
    icon: "📚",
  },
  {
    id: 2,
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
    icon: "🎮",
  },
  {
    id: 3,
    title: "Progress Tracking",
    description:
      "Monitor your progress and achievements with detailed analytics and personalized dashboards.",
    icon: "📊",
  },
  {
    id: 4,
    title: "Community Support",
    description:
      "Join a vibrant community of learners and instructors to collaborate and share knoledge.",
    icon: "👥",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <Badge variant="outline">
            <AnimatedShinyText>
              The Future of Online Education
            </AnimatedShinyText>
          </Badge>
          <TextAnimate
            animation="scaleUp"
            by="text"
            once
            as="h1"
            className="text-2xl font-bold tracking-tight max-[425px]:text-lg md:text-4xl lg:text-6xl"
          >
            Elevate your Learning Experience
          </TextAnimate>
          <TextAnimate
            animation="blurIn"
            as="p"
            once
            duration={5}
            className="text-muted-foreground max-[425px]:text-sm max-w-[700px] text-base md:text-base lg:text-xl"
          >
            Discover a new way to learn with our modern, interactive learning
            management system. Access high-quality courses anytime, anywhere.
          </TextAnimate>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 pb-10 md:grid-cols-2 lg:grid-cols-4 lg:pb-0">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="relative overflow-hidden transition-shadow hover:shadow-lg"
          >
            <CardHeader>
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
            <ShineBorder shineColor={["#f2b09a", "#e48e72", "#d97757"]} />
          </Card>
        ))}
      </section>
    </>
  );
}
