
'use server';

import { getSupportChatResponse as getSupportChatResponseFlow, type SupportChatInput, type SupportChatOutput } from '@/ai/flows/supportChatFlow';

export async function getSupportResponseAction(input: SupportChatInput): Promise<SupportChatOutput> {
  try {
    const result = await getSupportChatResponseFlow(input);
    return result;
  } catch (error)
    console.error('Error in getSupportResponseAction:', error);
    // Return a generic error message to the client
    return { response: "I'm sorry, something went wrong on my end. Please try again later." };
  }
}
