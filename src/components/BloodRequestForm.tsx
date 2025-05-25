
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { bloodGroups, urgencyLevels, type BloodRequest, type BloodGroup, type UrgencyLevel } from '@/types';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const requestSchema = z.object({
  requesterName: z.string().min(2, "Name is too short").optional(),
  patientName: z.string().min(2, "Patient name is too short").optional(),
  bloodGroup: z.enum(bloodGroups, { required_error: "Blood group is required" }),
  location: z.string().min(3, "Location is required (e.g., Hospital Name, Area)"),
  contactInformation: z.string().min(10, "Valid contact information is required"),
  additionalNotes: z.string().max(500, "Notes are too long").optional(),
});

export type BloodRequestFormInputs = z.infer<typeof requestSchema>;

interface BloodRequestFormProps {
  onSubmit: (data: BloodRequestFormInputs) => Promise<void>;
  defaultValues?: Partial<BloodRequestFormInputs>;
  isLoading?: boolean;
}

export function BloodRequestForm({ onSubmit, defaultValues, isLoading }: BloodRequestFormProps) {
  const form = useForm<BloodRequestFormInputs>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      requesterName: defaultValues?.requesterName ?? "",
      patientName: defaultValues?.patientName ?? "",
      bloodGroup: defaultValues?.bloodGroup, // For Select, undefined is fine initially
      location: defaultValues?.location ?? "",
      contactInformation: defaultValues?.contactInformation ?? "",
      additionalNotes: defaultValues?.additionalNotes ?? "",
    },
  });

  const handleFormSubmit: SubmitHandler<BloodRequestFormInputs> = async (data) => {
    await onSubmit(data);
    // form.reset(); // Optionally reset form on successful submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="requesterName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Your Name (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="patientName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Patient&apos;s Name (Optional)</FormLabel>
                <FormControl>
                    <Input placeholder="Patient's full name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="bloodGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Group Required</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood group" />
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
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hospital Name / Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Dhaka Medical College Hospital, Dhanmondi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Information</FormLabel>
              <FormControl>
                <Input placeholder="Your phone number or other contact details" {...field} />
              </FormControl>
              <FormDescription>This will be visible to potential donors.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any other relevant information, e.g., patient condition, number of bags needed." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
          ) : (
            "Submit Request"
          )}
        </Button>
      </form>
    </Form>
  );
}
