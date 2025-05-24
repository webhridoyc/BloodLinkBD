
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bloodGroups, type Donor, type BloodGroup } from '@/types';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const donorSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  bloodGroup: z.enum(bloodGroups, { required_error: "Blood group is required" }),
  location: z.string().min(3, "Location (City/Area) is required"),
  contactNumber: z.string().min(10, "Valid contact number is required").regex(/^\+?[0-9\s-]{10,}$/, "Invalid phone number format"),
});

export type DonorFormInputs = z.infer<typeof donorSchema>;

interface DonorRegistrationFormProps {
  onSubmit: (data: DonorFormInputs) => Promise<void>;
  defaultValues?: Partial<DonorFormInputs>;
  isLoading?: boolean;
}

export function DonorRegistrationForm({ onSubmit, defaultValues, isLoading }: DonorRegistrationFormProps) {
  const form = useForm<DonorFormInputs>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      bloodGroup: defaultValues?.bloodGroup, // For Select, undefined is fine initially
      location: defaultValues?.location ?? "",
      contactNumber: defaultValues?.contactNumber ?? "",
    },
  });

  const handleFormSubmit: SubmitHandler<DonorFormInputs> = async (data) => {
    await onSubmit(data);
    // form.reset(); // Optionally reset form
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Group</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your blood group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bloodGroups.map(group => (
                      <SelectItem key={group} value={group}>{group}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location (City/Area)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Dhaka, Mirpur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+8801XXXXXXXXX" {...field} />
              </FormControl>
              <FormDescription>This will be visible to those in need of blood.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
          ) : (
            "Register as Donor"
          )}
        </Button>
      </form>
    </Form>
  );
}
