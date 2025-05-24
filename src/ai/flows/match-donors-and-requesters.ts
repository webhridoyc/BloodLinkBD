'use server';

/**
 * @fileOverview An AI agent that matches blood donors and requesters.
 *
 * - matchDonorsAndRequesters - A function that handles the matching process.
 * - MatchDonorsAndRequestersInput - The input type for the matchDonorsAndRequesters function.
 * - MatchDonorsAndRequestersOutput - The return type for the matchDonorsAndRequesters function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchDonorsAndRequestersInputSchema = z.object({
  donors: z.array(
    z.object({
      id: z.string(),
      bloodGroup: z.string(),
      location: z.string(),
      contactNumber: z.string(),
      fcmToken: z.string().optional(),
    })
  ).describe('A list of blood donors.'),
  requests: z.array(
    z.object({
      id: z.string(),
      bloodGroup: z.string(),
      location: z.string(),
      urgency: z.string(),
      contactInformation: z.string(),
      additionalNotes: z.string().optional(),
    })
  ).describe('A list of blood requests.'),
});
export type MatchDonorsAndRequestersInput = z.infer<typeof MatchDonorsAndRequestersInputSchema>;

const MatchDonorsAndRequestersOutputSchema = z.array(
  z.object({
    donorId: z.string().describe('The ID of the donor.'),
    requestId: z.string().describe('The ID of the request.'),
    reason: z.string().describe('The reasoning behind the match.'),
  })
);
export type MatchDonorsAndRequestersOutput = z.infer<typeof MatchDonorsAndRequestersOutputSchema>;

export async function matchDonorsAndRequesters(
  input: MatchDonorsAndRequestersInput
): Promise<MatchDonorsAndRequestersOutput> {
  return matchDonorsAndRequestersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'matchDonorsAndRequestersPrompt',
  input: {schema: MatchDonorsAndRequestersInputSchema},
  output: {schema: MatchDonorsAndRequestersOutputSchema},
  prompt: `You are an AI assistant helping to match blood donors with blood requests.

Given the following list of blood donors:

{{#each donors}}
- Donor ID: {{id}}, Blood Group: {{bloodGroup}}, Location: {{location}}
{{/each}}

And the following list of blood requests:

{{#each requests}}
- Request ID: {{id}}, Blood Group: {{bloodGroup}}, Location: {{location}}, Urgency: {{urgency}}
{{/each}}

Find suitable matches between donors and requesters based on blood group and location.

For each match, provide a reason for the match.

Return a JSON array of matches, including the donor ID, request ID, and the reason for the match.
`,
});

const matchDonorsAndRequestersFlow = ai.defineFlow(
  {
    name: 'matchDonorsAndRequestersFlow',
    inputSchema: MatchDonorsAndRequestersInputSchema,
    outputSchema: MatchDonorsAndRequestersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
