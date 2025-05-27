
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { LogIn, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuth(); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user) {
      router.push('/profile'); 
    }
  }, [user, router]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push('/'); 
    } catch (err: any) {
      let errorMessage = "Failed to login. Please check your credentials.";
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
      } else if (err.code) {
        errorMessage = `Login failed: ${err.code}`;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (user && !loading) return null;

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-8rem)] py-8 px-4">
      <Card className="w-full max-w-4xl shadow-2xl overflow-hidden md:grid md:grid-cols-2 rounded-xl">
        <div className="relative h-64 md:h-full hidden md:block">
          <Image
            src="https://placehold.co/600x800.png"
            alt="Illustration representing community and connection for BloodLink BD"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="community health"
            priority
          />
           <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent"></div>
        </div>

        <div className="p-6 md:p-10 flex flex-col justify-center">
          <CardHeader className="text-center md:text-left px-0 pt-0">
            <div className="mx-auto md:mx-0 bg-primary/10 p-3 rounded-full w-fit mb-4">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">Member Login</CardTitle>
            <CardDescription className="text-md">
              Welcome back! Access your BloodLink BD account.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 text-destructive">
                  <AlertTriangle className="h-4 w-4 !text-destructive" />
                  <AlertTitle>Login Failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive font-medium">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {errors.password && <p className="text-sm text-destructive font-medium">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                ) : (
                  "Login to My Account"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-3 px-0 pt-6 pb-0">
            <Link href="/forgot-password"> 
              <Button variant="link" className="text-sm p-0 h-auto">Forgot password?</Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              Not a member yet?{' '}
              <Link href="/signup">
                <Button variant="link" className="p-0 h-auto">Create Membership Account</Button>
              </Link>
            </p>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
