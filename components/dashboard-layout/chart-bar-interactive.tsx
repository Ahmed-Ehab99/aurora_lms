"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export const description = "An interactive bar chart";

const chartConfig = {
  enrollments: {
    label: "Enrollments",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const rangeLabelMap: Record<string, string> = {
  "90d": "Last 3 months",
  "30d": "Last 30 days",
  "7d": "Last 7 days",
};

interface ChartBarInteractiveProps {
  enrollmentsData: { date: string; enrollments: number }[];
  currentRange: string;
  onRangeChange: (range: string) => void;
}

export function ChartBarInteractive({
  enrollmentsData,
  currentRange,
  onRangeChange,
}: ChartBarInteractiveProps) {
  const totalEnrollments = useMemo(
    () => enrollmentsData.reduce((acc, curr) => acc + curr.enrollments, 0),
    [enrollmentsData],
  );

  const currentRangeLabel = rangeLabelMap[currentRange] ?? "Selected period";

  return (
    <Card className="@container/card">
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Total Enrollments</CardTitle>
          <div className="text-3xl font-bold tracking-tight">
            {totalEnrollments.toLocaleString()}
          </div>
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              Total enrollments for {currentRangeLabel}
            </span>
            <span className="@[540px]/card:hidden">{currentRangeLabel}</span>
          </CardDescription>
        </div>
        <CardAction>
          <ToggleGroup
            type="single"
            value={currentRange}
            onValueChange={onRangeChange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! lg:flex"
          >
            <ToggleGroupItem value="90d" className="cursor-pointer">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="cursor-pointer">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="cursor-pointer">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={currentRange} onValueChange={onRangeChange}>
            <SelectTrigger
              className="hover:text-accent-foreground text-muted-foreground flex w-36 cursor-pointer font-medium **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate lg:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="text-muted-foreground rounded-xl font-medium">
              <SelectItem value="90d" className="cursor-pointer rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="cursor-pointer rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="cursor-pointer rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: 12,
              right: 12,
            }}
            data={enrollmentsData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              interval={"preserveStartEnd"}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey="enrollments" fill="var(--color-enrollments)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
