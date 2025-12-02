"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { audienceData } from "@/services/mockDashboardData";

export const AudienceChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Audience Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={audienceData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
              }}
            />
            <Bar
              dataKey="newVisitors"
              fill="hsl(var(--chart-1))"
              name="New Visitors"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="uniqueVisitors"
              fill="hsl(var(--chart-2))"
              name="Unique Visitors"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
