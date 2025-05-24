
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Edit, Trash2 } from "lucide-react";

export default function AdminManageRequestsPage() {
  // Placeholder data - replace with actual data fetching and state management
  const requests = [
    { id: "req1", patientName: "Aisha Khan", bloodGroup: "O+", location: "Square Hospital", urgency: "Urgent", status: "Active", date: "2024-07-28" },
    { id: "req2", patientName: "Rahim Ali", bloodGroup: "A-", location: "BSMMU", urgency: "Moderate", status: "Pending", date: "2024-07-27" },
    { id: "req3", patientName: "Fatima Begum", bloodGroup: "B+", location: "DMCH", urgency: "Low", status: "Fulfilled", date: "2024-07-26" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Manage Blood Requests</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Blood Requests</CardTitle>
          <CardDescription>View, filter, sort, and manage all blood requests on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="relative w-full max-w-sm">
              <Input type="search" placeholder="Search requests..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>{req.patientName}</TableCell>
                    <TableCell><Badge variant="secondary">{req.bloodGroup}</Badge></TableCell>
                    <TableCell>{req.location}</TableCell>
                    <TableCell>
                      <Badge variant={req.urgency === 'Urgent' ? 'destructive' : (req.urgency === 'Moderate' ? 'default' : 'outline')}>
                        {req.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <Badge variant={req.status === 'Active' ? 'default' : (req.status === 'Fulfilled' ? 'secondary' : 'outline')} 
                              className={req.status === 'Active' ? 'bg-blue-500 text-white' : (req.status === 'Fulfilled' ? 'bg-green-500 text-white' : '')}>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="ghost" size="icon" aria-label="Edit request">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Delete request">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            This is a placeholder. Full functionality for managing requests (filtering, sorting, status updates, deletion) will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
