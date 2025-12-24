"use client";

import { useState } from "react";
import { ChartBarInteractive } from "./chart-bar-interactive";

type TimeRange = "7d" | "30d" | "90d";

interface EnrollmentsChartProps {
  enrollmentsData: {
    "7d": { date: string; enrollments: number }[];
    "30d": { date: string; enrollments: number }[];
    "90d": { date: string; enrollments: number }[];
  };
}

export function EnrollmentsChart({ enrollmentsData }: EnrollmentsChartProps) {
  const [currentRange, setCurrentRange] = useState<TimeRange>("7d");

  const handleRangeChange = (range: string) => {
    if (range === "7d" || range === "30d" || range === "90d") {
      setCurrentRange(range);
    }
  };

  return (
    <ChartBarInteractive
      enrollmentsData={enrollmentsData[currentRange]}
      currentRange={currentRange}
      onRangeChange={handleRangeChange}
    />
  );
}
