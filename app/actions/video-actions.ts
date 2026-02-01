"use server";

import { inngest } from "@/inngest/client";

export async function triggerVideoGeneration(seriesId: string, userId: string) {
    console.log(`Triggering video generation for series: ${seriesId} by user: ${userId}`);

    await inngest.send({
        name: "app/video.generate",
        data: {
            seriesId,
            userId,
        },
    });

    return { success: true };
}
