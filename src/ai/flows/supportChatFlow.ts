
'use server';
/**
 * @fileOverview A support chatbot flow for BloodLink BD.
 *
 * - getSupportResponse - A function that handles the chatbot interaction.
 * - SupportChatInput - The input type for the getSupportResponse function.
 * - SupportChatOutput - The return type for the getSupportResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit'; // Changed from 'genkit/zod'

export const SupportChatInputSchema = z.object({
  message: z.string().describe('The user\'s message to the chatbot.'),
  // history: z.array(z.object({
  //   role: z.enum(['user', 'model']),
  //   content: z.string(),
  // })).optional().describe('The previous conversation history.'),
});
export type SupportChatInput = z.infer<typeof SupportChatInputSchema>;

export const SupportChatOutputSchema = z.object({
  response: z.string().describe('The chatbot\'s response.'),
});
export type SupportChatOutput = z.infer<typeof SupportChatOutputSchema>;

// This is a simplified wrapper for now.
// If you need to call the flow directly (e.g. from Genkit dev UI), use supportChatFlow directly.
export async function getSupportChatResponse(input: SupportChatInput): Promise<SupportChatOutput> {
  const result = await supportChatFlow(input);
  return result;
}

const supportChatPrompt = ai.definePrompt({
  name: 'supportChatPrompt',
  input: { schema: SupportChatInputSchema },
  output: { schema: SupportChatOutputSchema },
  prompt: `You are a friendly and helpful support assistant for "BloodLink BD", a web application designed to connect blood donors with individuals in need of blood in Bangladesh.

Your capabilities are to answer questions about the app's features and guide users on how to use the application.
Do NOT provide medical advice, opinions, or any information outside the scope of how to use the BloodLink BD application.
If the user asks something unrelated to BloodLink BD or its features, politely state that you can only help with questions about the BloodLink BD application.

Key features of BloodLink BD that you can talk about:
- User Membership: Users can sign up for membership and log in.
- Donor Registration: Members can register as blood donors, providing details like their full name, blood group, location (city/area), and contact number. They can also manage their availability.
- Posting Blood Requests: Members can post requests for blood, specifying the blood group needed, patient details (optional), location (hospital/area), urgency level (Urgent, Moderate, Low), and contact information.
- Viewing Donors & Requests: Users can browse lists of available donors and active blood requests. These lists can be filtered by blood group and location.
- AI Matching Tool: An AI-powered tool to help find potential matches between registered donors and active blood requests based on compatibility factors.
- My Profile Page: Authenticated users can view their profile, see their own blood requests, and manage their donor profile.
- Hospitals Information: A page listing major hospitals in Bangladesh (this is static information).
- Contact Us Page: For users to send inquiries or feedback.

Based on the user's message: {{{message}}}

Provide a concise, helpful, and polite answer related to these features.
If the question is vague, you can ask for clarification.
Keep your responses focused on assisting the user with the BloodLink BD platform.
`,
});

const supportChatFlow = ai.defineFlow(
  {
    name: 'supportChatFlow',
    inputSchema: SupportChatInputSchema,
    outputSchema: SupportChatOutputSchema,
  },
  async (input) => {
    const llmResponse = await supportChatPrompt(input); // Pass the whole input object
    const output = llmResponse.output();
    if (!output) {
      // Fallback response if the LLM fails to generate structured output
      return { response: "I'm sorry, I couldn't process that request. Could you try rephrasing?" };
    }
    return output;
  }
);
