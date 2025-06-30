import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "Resume market", // Unique app ID
  name: "Resume market",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
