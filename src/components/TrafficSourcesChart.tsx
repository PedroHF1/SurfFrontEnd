"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { trafficSources } from "@/services/mockDashboardData";

export const TrafficSourcesChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Traffic Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={trafficSources}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={({ percentage }) => `${percentage}%`}
            >
              {trafficSources.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => {
                const item = trafficSources.find((s) => s.name === value);
                return `${value} (${item?.percentage}%)`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 text-center">
          <div className="text-3xl font-bold">76%</div>
          <div className="text-sm text-muted-foreground">Direct Visitors</div>
          <p className="text-xs text-muted-foreground mt-1">
            This is a simple hero unit, a simple jumbotron component
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
