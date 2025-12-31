import { adminGetDashboardStats } from "@/app/data/admin/admin-get-dashboard-stats";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconBook,
  IconPlaylistX,
  IconShoppingCart,
  IconUsers,
  type Icon,
} from "@tabler/icons-react";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: Icon;
}

function StatCard({ title, value, description, icon: Icon }: StatCardProps) {
  return (
    <Card className="group @container/card relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {value}
          </CardTitle>
        </div>
        <div className="bg-primary/10 text-primary group-hover:bg-primary/50 flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
          <Icon className="text-muted-foreground size-6" />
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <p className="text-muted-foreground">{description}</p>
      </CardFooter>
      <BorderBeam
        duration={5}
        size={100}
        className="from-primary via-primary/50 to-transparent"
      />
    </Card>
  );
}

export async function SectionCards() {
  const { totalCourses, totalCustomers, totalLessons, totalSignups } =
    await adminGetDashboardStats();

  const stats: StatCardProps[] = [
    {
      title: "Total Signups",
      value: totalSignups,
      description: "Registered users on the platform, excluding admins",
      icon: IconUsers,
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      description: "Users who have enrolled in courses, excluding admins",
      icon: IconShoppingCart,
    },
    {
      title: "Total Courses",
      value: totalCourses,
      description: "Available courses on the platform",
      icon: IconBook,
    },
    {
      title: "Total Lessons",
      value: totalLessons,
      description: "Total learning content available",
      icon: IconPlaylistX,
    },
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs md:gap-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
