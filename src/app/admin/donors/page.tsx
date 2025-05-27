
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Edit, Ban, UserCheck, UserPlus } from "lucide-react";
import Link from "next/link";

export default function AdminManageDonorsPage() {
  // Placeholder data
  const donors = [
    { id: "donor1", name: "Md. Abdullah", bloodGroup: "A+", location: "Dhaka", contact: "01712345678", status: "Active", joined: "2023-01-15", avatar: "https://placehold.co/40x40.png?text=MA", dataAiHint: "man portrait" },
    { id: "donor2", name: "Salma Akter", bloodGroup: "B-", location: "Chittagong", contact: "01812345679", status: "Banned", joined: "2023-03-22", avatar: "https://placehold.co/40x40.png?text=SA", dataAiHint: "woman portrait" },
    { id: "donor3", name: "Karim Chowdhury", bloodGroup: "AB+", location: "Sylhet", contact: "01912345680", status: "Active", joined: "2023-05-10", avatar: "https://placehold.co/40x40.png?text=KC", dataAiHint: "male profile" },
  ];

  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Donors</h1>
        <Button asChild>
            <Link href="/admin/donors/new"> {/* Assuming a page to add new donor manually */}
                <UserPlus className="mr-2 h-4 w-4" /> Add New Donor
            </Link>
        </Button>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>All Registered Donors</CardTitle>
          <CardDescription>View, filter, and manage all registered donors. Perform actions like banning/unbanning or editing donor info.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div className="relative w-full md:max-w-sm">
              <Input type="search" placeholder="Search donors by name, location..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter Donors
            </Button>
          </div>

          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Name</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donors.map((donor) => (
                  <TableRow key={donor.id}>
                    <TableCell className="flex items-center gap-3 font-medium">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={donor.avatar} alt={donor.name} data-ai-hint={donor.dataAiHint} />
                        <AvatarFallback>{getInitials(donor.name)}</AvatarFallback>
                      </Avatar>
                      {donor.name}
                    </TableCell>
                    <TableCell><Badge variant="secondary" className="text-sm">{donor.bloodGroup}</Badge></TableCell>
                    <TableCell>{donor.location}</TableCell>
                    <TableCell>{donor.contact}</TableCell>
                    <TableCell>
                      <Badge variant={donor.status === 'Active' ? 'default' : 'destructive'}
                             className={donor.status === 'Active' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300'}>
                        {donor.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{donor.joined}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="ghost" size="icon" aria-label="Edit donor" className="hover:bg-accent">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {donor.status === 'Active' ? (
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" aria-label="Ban donor">
                          <Ban className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-600 hover:bg-green-500/10" aria-label="Unban donor">
                          <UserCheck className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
           <p className="text-sm text-muted-foreground mt-4 pt-4 border-t">
            Note: This is a placeholder page. Full functionality for managing donors (live data, search, filtering, actions) will be implemented separately.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
