
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <div className="text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold">Contact BloodLink BD</h1>
        <p className="text-muted-foreground mt-2">
          We&apos;d love to hear from you. Reach out with any questions or feedback.
        </p>
      </div>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Email Us</h3>
              <p className="text-muted-foreground">For general inquiries, support, or feedback:</p>
              <a href="mailto:contact@bloodlinkbd.org" className="text-primary hover:underline">
                contact@bloodlinkbd.org
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
             <div className="bg-primary/20 p-3 rounded-full">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Call Us (Placeholder)</h3>
              <p className="text-muted-foreground">For urgent matters (Mon-Fri, 9am-5pm):</p>
              <p className="text-primary">+880 123 456 7890</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
             <div className="bg-primary/20 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Our Office (Placeholder)</h3>
              <p className="text-muted-foreground">BloodLink BD Initiative</p>
              <p>123 LifeSaver Road, Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
            <div className="space-x-3">
                <Button variant="outline" asChild>
                    <Link href="/requests">View Requests</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/donors">Find Donors</Link>
                </Button>
                 <Button variant="outline" asChild>
                    <Link href="/faq">FAQ</Link> {/* Placeholder for FAQ page */}
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
