
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplet, Users, Search, HeartHandshake, UserPlus, PlusCircle } from 'lucide-react'; // Corrected: UserPlus, PlusCircle were missing
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-primary/20 via-background to-accent/20 rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <HeartHandshake className="mx-auto h-16 w-16 text-primary mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Welcome to BloodLink BD
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your vital connection for blood donation in Bangladesh. Find donors, request blood, and save lives with ease.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/requests/new">Request Blood</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/donors/register">Become a Donor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/*
      <section className="grid md:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Droplet className="h-10 w-10 text-primary" />
              <CardTitle className="text-2xl">Find Blood</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Quickly search for active blood requests. Filter by blood group and location to find what you need.
            </CardDescription>
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href="/requests">View Active Requests &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-10 w-10 text-primary" />
              <CardTitle className="text-2xl">Become a Donor</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Join our community of life-savers. Register as a donor and help those in critical need.
            </CardDescription>
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href="/donors/register">Register Now &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Search className="h-10 w-10 text-primary" />
              <CardTitle className="text-2xl">AI Matching</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Our intelligent AI tool helps connect donors with requesters efficiently based on compatibility.
            </CardDescription>
            <Button variant="link" asChild className="p-0 h-auto">
              <Link href="/ai-matcher">Try AI Matcher &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-card rounded-lg shadow-md">
              <div className="p-3 bg-primary/20 rounded-full inline-block mb-3">
                <UserPlus className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Register</h3>
              <p className="text-muted-foreground text-sm">Users sign up and donors provide their details.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md">
               <div className="p-3 bg-primary/20 rounded-full inline-block mb-3">
                <PlusCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Post/View Requests</h3>
              <p className="text-muted-foreground text-sm">Post a blood need or browse existing requests.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md">
               <div className="p-3 bg-primary/20 rounded-full inline-block mb-3">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Get Matched</h3>
              <p className="text-muted-foreground text-sm">Our AI assists in finding suitable donor matches.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md">
               <div className="p-3 bg-primary/20 rounded-full inline-block mb-3">
                <HeartHandshake className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">4. Connect & Save</h3>
              <p className="text-muted-foreground text-sm">Donors and requesters connect to facilitate donation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Every Drop Counts</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
            Your decision to donate blood can save a life, or even several if your blood is separated into its components. Be a hero today.
          </p>
          <Image 
            src="https://placehold.co/800x400.png" 
            alt="Blood donation awareness" 
            width={800} 
            height={400} 
            className="rounded-lg mx-auto shadow-xl"
            style={{ objectFit: 'cover' }}
            data-ai-hint="blood donation awareness"
          />
      </section>
      */}
    </div>
  );
}
