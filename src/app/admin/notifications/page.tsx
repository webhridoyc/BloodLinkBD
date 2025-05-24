
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Users, Droplet, MapPin } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

export default function AdminSendNotificationsPage() {
  const [targetGroup, setTargetGroup] = useState("all");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSendNotification = () => {
    // Placeholder: Implement actual FCM sending logic here (likely via a Cloud Function)
    console.log({ targetGroup, bloodGroup, city, title, message });
    toast({
      title: "Notification (Placeholder)",
      description: `Notification to ${targetGroup} users (Title: ${title}) would be sent here.`,
    });
    // Reset form
    setTitle("");
    setMessage("");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Send Notifications</h1>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Compose Notification</CardTitle>
          <CardDescription>Send custom push notifications to users via FCM.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="targetGroup">Target Users</Label>
            <Select value={targetGroup} onValueChange={setTargetGroup}>
              <SelectTrigger id="targetGroup">
                <SelectValue placeholder="Select target group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"><Users className="inline-block mr-2 h-4 w-4" /> All Users</SelectItem>
                <SelectItem value="bloodGroup"><Droplet className="inline-block mr-2 h-4 w-4" /> By Blood Group</SelectItem>
                <SelectItem value="city"><MapPin className="inline-block mr-2 h-4 w-4" /> By City</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {targetGroup === "bloodGroup" && (
            <div>
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Input 
                id="bloodGroup" 
                placeholder="e.g., A+" 
                value={bloodGroup} 
                onChange={(e) => setBloodGroup(e.target.value)} 
              />
            </div>
          )}

          {targetGroup === "city" && (
            <div>
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                placeholder="e.g., Dhaka" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          )}

          <div>
            <Label htmlFor="title">Notification Title</Label>
            <Input 
              id="title" 
              placeholder="Urgent: Blood Needed!" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          <div>
            <Label htmlFor="message">Notification Message</Label>
            <Textarea 
              id="message" 
              placeholder="Detailed message content..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
            />
          </div>
          
          <Button onClick={handleSendNotification}>
            <Send className="mr-2 h-4 w-4" /> Send Notification
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            This is a placeholder. Actual notification sending requires backend (e.g., Firebase Cloud Functions) integration with FCM.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
