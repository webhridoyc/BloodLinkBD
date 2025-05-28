
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Droplets, ListChecks, Users } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';
import type { ChartConfig } from "@/components/ui/chart";

const requestsOverTimeData = [
  { month: 'Jan', desktop: 186, mobile: 80 },
  { month: 'Feb', desktop: 305, mobile: 200 },
  { month: 'Mar', desktop: 237, mobile: 120 },
  { month: 'Apr', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'Jun', desktop: 214, mobile: 140 },
];

const requestsChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const bloodGroupData = [
  { name: 'A+', value: 400, fill: "hsl(var(--chart-1))" },
  { name: 'O+', value: 300, fill: "hsl(var(--chart-2))" },
  { name: 'B+', value: 200, fill: "hsl(var(--chart-3))" },
  { name: 'AB+', value: 100, fill: "hsl(var(--chart-4))" },
  { name: 'A-', value: 50, fill: "hsl(var(--chart-5))" },
  { name: 'Others', value: 50, fill: "hsl(var(--muted))" },
];

const bloodGroupChartConfig = bloodGroupData.reduce((acc, entry) => {
  acc[entry.name] = { label: entry.name, color: entry.fill };
  return acc;
}, {} as ChartConfig);


export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <ListChecks className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">+10 since last hour</p>
          </CardContent>
        </Card>
         <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Donors</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">789</div>
            <p className="text-xs text-muted-foreground">+5 new this week</p>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">High</div>
            <p className="text-xs text-muted-foreground">Based on recent interactions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Blood Requests Over Time</CardTitle>
            <CardDescription>Monthly trend of blood requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={requestsChartConfig} className="min-h-[300px] w-full">
              <BarChart accessibilityLayer data={requestsOverTimeData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Blood Group Distribution (Requests)</CardTitle>
            <CardDescription>Distribution of requested blood groups.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-0 aspect-square">
             <ChartContainer config={bloodGroupChartConfig} className="mx-auto w-full h-full min-h-[300px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                <Pie data={bloodGroupData} dataKey="value" nameKey="name" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                  {bloodGroupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="name"/>} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
       <p className="text-sm text-muted-foreground mt-4 text-center">
            Note: Dashboard data is currently placeholder and for demonstration purposes.
        </p>
    </div>
  );
}
