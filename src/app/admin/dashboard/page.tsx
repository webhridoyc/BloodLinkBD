
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Users, ListChecks, CheckCircle, Clock } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Pie, Cell, Line } from 'recharts';

// Placeholder data for charts
const requestsOverTimeData = [
  { date: 'Jan', requests: 30 }, { date: 'Feb', requests: 45 }, { date: 'Mar', requests: 60 },
  { date: 'Apr', requests: 50 }, { date: 'May', requests: 70 }, { date: 'Jun', requests: 85 },
];

const bloodGroupData = [
  { name: 'A+', value: 400 }, { name: 'O+', value: 300 }, { name: 'B+', value: 200 },
  { name: 'AB+', value: 100 }, { name: 'A-', value: 50 }, { name: 'Others', value: 50 },
];
const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF005A', '#A200FF'];


export default function AdminDashboardPage() {
  // These stats would typically be fetched from Firestore
  const stats = {
    totalDonors: 1250,
    activeRequests: 75,
    fulfilledRequests: 480,
    pendingRequests: 30,
  };

  const chartConfig = {
    requests: { label: "Requests", color: "hsl(var(--primary))" },
  };
   const bloodChartConfig = {
    value: { label: "Count" },
    "A+": { label: "A+", color: COLORS[0] },
    "O+": { label: "O+", color: COLORS[1] },
    "B+": { label: "B+", color: COLORS[2] },
    "AB+": { label: "AB+", color: COLORS[3] },
    "A-": { label: "A-", color: COLORS[4] },
    "Others": { label: "Others", color: COLORS[5] },
  };


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDonors}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <ListChecks className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRequests}</div>
            <p className="text-xs text-muted-foreground">Currently open requests</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fulfilled Requests</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fulfilledRequests}</div>
            <p className="text-xs text-muted-foreground">+15 since last week</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-5 w-5 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Requests needing review</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Requests Over Time</CardTitle>
            <CardDescription>Monthly blood requests trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={requestsOverTimeData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line type="monotone" dataKey="requests" stroke="var(--color-requests)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Most Requested Blood Groups</CardTitle>
             <CardDescription>Distribution of requests by blood group</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
             <ChartContainer config={bloodChartConfig} className="h-[300px] w-full aspect-square">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                  <Pie data={bloodGroupData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {bloodGroupData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                   <ChartLegend content={<ChartLegendContent nameKey="name" />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" />
                </PieChart>
              </ResponsiveContainer>
             </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

