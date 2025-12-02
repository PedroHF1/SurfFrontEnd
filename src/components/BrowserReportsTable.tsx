import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { browserReports } from "@/services/mockDashboardData";
import { ArrowDown, ArrowUp } from "lucide-react";

export const BrowserReportsTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Browser Used & Traffic Reports
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Channel
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                  Sessions
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                  Prev-Period
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                  % Change
                </th>
              </tr>
            </thead>
            <tbody>
              {browserReports.map((report, index) => {
                const isPositive = report.change > 0;
                return (
                  <tr
                    key={index}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                        {report.channel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm">
                      {report.sessions.toLocaleString()}
                      <span className="text-xs text-muted-foreground ml-1">
                        (23%)
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-sm text-muted-foreground">
                      {report.prevPeriod.toLocaleString()}
                      <span className="text-xs ml-1">(42%)</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div
                        className={`flex items-center justify-end gap-1 text-sm font-medium ${
                          isPositive
                            ? "text-green-600 dark:text-green-500"
                            : "text-red-600 dark:text-red-500"
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )}
                        {Math.abs(report.change).toFixed(2)}%
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
