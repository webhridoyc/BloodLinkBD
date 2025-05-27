
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize the Google AI plugin.
// Ensure your GOOGLE_API_KEY environment variable is set.
const gemini = googleAI();

const ai = genkit({
  plugins: [gemini],
  // As per Genkit v1.x guidance, logLevel is not configured here.
  // For tracing and logging, you might consider OpenTelemetry and log exporters.
  // telemetry: {
  //   instrumentation: {},
  //   logger: { console: true }, // Example: log to console
  // },
});

export {ai};
