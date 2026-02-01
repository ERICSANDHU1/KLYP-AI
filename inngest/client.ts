import { Inngest } from "inngest";

// Process.env.INNGEST_EVENT_KEY and INNGEST_SIGNING_KEY will be used automatically
export const inngest = new Inngest({ id: "klyp-app" });
