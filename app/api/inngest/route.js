import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";
// Fixed relative path: now goes up three levels to reach the root lib folder
import { generateIndustryInsights } from "../../../lib/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [generateIndustryInsights],
});
