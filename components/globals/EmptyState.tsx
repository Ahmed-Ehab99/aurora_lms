import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Plus } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const EmptyState = ({ title, description, buttonText, href }: EmptyStateProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="bg-primary/10 rounded-full p-6">
          <BookOpen className="text-primary size-12" />
        </div>

        <h2 className="mt-6 text-2xl font-semibold">{title}</h2>

        <p className="text-muted-foreground mt-2 max-w-md text-center">
          {description}
        </p>

        <Button asChild className="mt-6">
          <Link href={href}>
            <Plus className="mr-2 size-4" />
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
