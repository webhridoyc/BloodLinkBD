
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Edit, Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AdminManageRequestsPage() {
  // Placeholder data - replace with actual data fetching and state management
  const requests = [
    { id: "req1", patientName: "Aisha Khan", bloodGroup: "O+", location: "Square Hospital", urgency: "Urgent", status: "Active", date: "2024-07-28" },
    { id: "req2", patientName: "Rahim Ali", bloodGroup: "A-", location: "BSMMU", urgency: "Moderate", status: "Pending", date: "2024-07-27" },
    { id: "req3", patientName: "Fatima Begum", bloodGroup: "B+", location: "DMCH", urgency: "Low", status: "Fulfilled", date: "2024-07-26" },
  ];

  const getUrgencyBadgeVariant = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'urgent': return 'destructive';
      case 'moderate': return 'default';
      default: return 'outline';
    }
  };
  
  const getStatusBadgeClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'fulfilled': return 'bg-green-100 text-green-700 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };


  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Blood Requests</h1>
         <Button asChild>
            <Link href="/requests/new"> {/* Or a specific admin route for creating requests */}
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Request
            </Link>
        </Button>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Blood Requests</CardTitle>
          <CardDescription>View, filter, sort, and manage all blood requests on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="relative w-full md:max-w-sm">
              <Input type="search" placeholder="Search by patient, location..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter Requests
            </Button>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Patient Name</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.patientName}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-sm">{req.bloodGroup}</Badge></TableCell>
                    <TableCell>{req.location}</TableCell>
                    <TableCell>
                      <Badge variant={getUrgencyBadgeVariant(req.urgency)} className="text-xs">
                        {req.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <Badge variant="outline" className={getStatusBadgeClasses(req.status) + " text-xs"}>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" aria-label="Edit request" className="hover:bg-accent">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" aria-label="Delete request">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground mt-4 pt-4 border-t">
            Note: This is a placeholder page. Full functionality for managing requests (live data, filtering, sorting, status updates, deletion) will be implemented separately.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
