
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Users, Droplet, MapPin, Info } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminSendNotificationsPage() {
  const [targetGroup, setTargetGroup] = useState("all");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSendNotification = async () => {
    if(!title || !message) {
        toast({
            title: "Missing Information",
            description: "Please provide a title and message for the notification.",
            variant: "destructive",
        });
        return;
    }
    setIsSending(true);
    // Placeholder: Implement actual FCM sending logic here (likely via a Cloud Function)
    console.log("Sending notification with data:", { targetGroup, bloodGroup, city, title, message });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Notification Sent (Placeholder)",
      description: `Notification to ${targetGroup} users (Title: ${title}) has been queued for sending.`,
    });
    // Reset form
    setTitle("");
    setMessage("");
    setBloodGroup("");
    setCity("");
    setIsSending(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Send Push Notifications</h1>
      
      <Card className="shadow-xl max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Compose Notification</CardTitle>
          <CardDescription>Craft and send custom push notifications to user segments via FCM.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="targetGroup" className="mb-1 block font-medium">Target Audience</Label>
            <Select value={targetGroup} onValueChange={setTargetGroup}>
              <SelectTrigger id="targetGroup">
                <SelectValue placeholder="Select target group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all"><Users className="inline-block mr-2 h-4 w-4 text-muted-foreground" /> All Users</SelectItem>
                <SelectItem value="bloodGroup"><Droplet className="inline-block mr-2 h-4 w-4 text-muted-foreground" /> Donors by Blood Group</SelectItem>
                <SelectItem value="city"><MapPin className="inline-block mr-2 h-4 w-4 text-muted-foreground" /> Donors by City</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {targetGroup === "bloodGroup" && (
            <div>
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Input 
                id="bloodGroup" 
                placeholder="e.g., A+, O-" 
                value={bloodGroup} 
                onChange={(e) => setBloodGroup(e.target.value.toUpperCase())} 
              />
            </div>
          )}

          {targetGroup === "city" && (
            <div>
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                placeholder="e.g., Dhaka, Chittagong" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          )}

          <div>
            <Label htmlFor="title">Notification Title</Label>
            <Input 
              id="title" 
              placeholder="Urgent: Blood Needed for Patient X" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>

          <div>
            <Label htmlFor="message">Notification Message</Label>
            <Textarea 
              id="message" 
              placeholder="Detailed message: A patient at ABC Hospital needs A+ blood urgently. Please contact 01xxxxxxxxx if you can help." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              rows={4}
            />
          </div>
          
          <Button onClick={handleSendNotification} disabled={isSending} className="w-full md:w-auto">
            {isSending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
            ) : (
                <Send className="mr-2 h-4 w-4" />
            )}
            {isSending ? "Sending..." : "Send Notification"}
          </Button>
        </CardContent>
        <CardFooter>
            <Alert variant="default" className="border-primary/50 bg-primary/10">
                <Info className="h-4 w-4 text-primary" />
                <AlertDescription className="text-primary/90">
                    This is a UI placeholder. Actual notification sending requires backend integration with Firebase Cloud Messaging (FCM).
                </AlertDescription>
            </Alert>
        </CardFooter>
      </Card>
    </div>
  );
}
