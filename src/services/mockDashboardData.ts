export interface MetricCardData {
  title: string;
  value: string;
  change: number;
  description: string;
  icon?: string;
}

export interface AudienceData {
  month: string;
  newVisitors: number;
  uniqueVisitors: number;
}

export interface TrafficSource {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface BrowserReport {
  channel: string;
  sessions: number;
  prevPeriod: number;
  change: number;
}

export interface ActivityItem {
  user: string;
  action: string;
  target: string;
  time: string;
}

export interface DeviceStats {
  mobile: number;
  tablet: number;
  desktop: number;
}

export const kpiMetrics: MetricCardData[] = [
  {
    title: "Sessions",
    value: "24k",
    change: 1.5,
    description: "New Sessions Today",
  },
  {
    title: "Avg Sessions",
    value: "00:18",
    change: 1.8,
    description: "Weekly Avg Sessions",
  },
  {
    title: "Bounce Rate",
    value: "$24.00",
    change: -36,
    description: "Bounce Rate Weekly",
  },
  {
    title: "Goal Completions",
    value: "85000",
    change: 16.5,
    description: "Completions Weekly",
  },
];

export const audienceData: AudienceData[] = [
  { month: "Jan", newVisitors: 45, uniqueVisitors: 210 },
  { month: "Feb", newVisitors: 52, uniqueVisitors: 280 },
  { month: "Mar", newVisitors: 61, uniqueVisitors: 320 },
  { month: "Apr", newVisitors: 80, uniqueVisitors: 380 },
  { month: "May", newVisitors: 75, uniqueVisitors: 430 },
  { month: "Jun", newVisitors: 65, uniqueVisitors: 480 },
  { month: "Jul", newVisitors: 90, uniqueVisitors: 530 },
  { month: "Aug", newVisitors: 72, uniqueVisitors: 580 },
  { month: "Sep", newVisitors: 105, uniqueVisitors: 630 },
  { month: "Oct", newVisitors: 88, uniqueVisitors: 680 },
  { month: "Nov", newVisitors: 62, uniqueVisitors: 730 },
  { month: "Dec", newVisitors: 78, uniqueVisitors: 780 },
];

export const trafficSources: TrafficSource[] = [
  { name: "Direct", value: 76, percentage: 76, color: "hsl(var(--chart-1))" },
  { name: "Referral", value: 12, percentage: 12, color: "hsl(var(--chart-2))" },
  { name: "Social", value: 8, percentage: 8, color: "hsl(var(--chart-3))" },
  { name: "Organic", value: 4, percentage: 4, color: "hsl(var(--chart-4))" },
];

export const browserReports: BrowserReport[] = [
  { channel: "Organic search", sessions: 10853, prevPeriod: 9641, change: 52.6 },
  { channel: "Direct", sessions: 2545, prevPeriod: 2941, change: -17.2 },
  { channel: "Referral", sessions: 1836, prevPeriod: 1268, change: 41.12 },
  { channel: "Email", sessions: 1958, prevPeriod: 1721, change: -8.24 },
  { channel: "Social", sessions: 1566, prevPeriod: 1321, change: 26.33 },
];

export const activityFeed: ActivityItem[] = [
  {
    user: "Donald",
    action: "updated the status of",
    target: "Refund #7234",
    time: "2 minutes ago",
  },
  {
    user: "Lucy Peterson",
    action: "was added to the group",
    target: "Dastyle",
    time: "1 hour ago",
  },
  {
    user: "Joseph Rust",
    action: "opened new discussion",
    target: "Marvel #12233",
    time: "2 hours ago",
  },
];

export const deviceStats: DeviceStats = {
  mobile: 61,
  tablet: 31,
  desktop: 8,
};

export const pageViewsData = [
  {
    page: "Dastyle - Admin Dashboard",
    url: "analytic.index.html",
    views: 4300,
    trend: [20, 25, 30, 28, 32, 30, 28],
  },
  {
    page: "Monica Simpler - Admin Dashboard",
    url: "sales.index.html",
    views: 3700,
    trend: [15, 18, 22, 20, 23, 21, 19],
  },
  {
    page: "Corona - Admin Dashboard",
    url: "helpdesk.index.html",
    views: 2800,
    trend: [10, 12, 15, 14, 16, 15, 13],
  },
  {
    page: "Amexa - Admin Dashboard",
    url: "crypto.index.html",
    views: 1200,
    trend: [5, 6, 8, 7, 9, 8, 7],
  },
];
