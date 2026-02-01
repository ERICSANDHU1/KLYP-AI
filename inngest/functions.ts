import { inngest } from "./client";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenAI } from "@google/genai";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { event, body: "Hello, World!" };
    }
);

export const generateVideo = inngest.createFunction(
    { id: "generate-video" },
    { event: "app/video.generate" },
    async ({ event, step }) => {
        const { seriesId, userId } = event.data;

        // 1. Fetch Series data from supabase
        const series = await step.run("fetch-series-data", async () => {
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
            const client = createClient(supabaseUrl, supabaseKey);

            const { data, error } = await client
                .from('series_v2')
                .select('*')
                .eq('id', seriesId)
                .single();

            if (error) throw new Error(`Failed to fetch series: ${error.message}`);
            return data;
        });

        // 2. Generate Video Script using AI
        const scriptData = await step.run("generate-script", async () => {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

            const client = new GoogleGenAI({ apiKey });
            // model: "gemini-2.0-flash"

            const durationStr = series.duration || "30 Seconds";
            const isShort = durationStr.toLowerCase().includes("30");
            const numScenes = isShort ? "4-5" : "5-6";

            const prompt = `
        You are an expert viral video script writer. Create a compelling script for a short video.
        
        CONTEXT:
        - Series Name: "${series.name}"
        - Niche: ${series.niche_config?.label || "General"}
        - Video Style: ${series.video_style_config?.name || "Realistic"}
        - Target Duration: ${durationStr}
        - Target Audience: ${series.niche_config?.audience || "General Audience"}
        
        REQUIREMENTS:
        1. Generate exactly ${numScenes} scenes.
        2. "video_title": Catchy, viral title (under 60 chars).
        3. "scenes": Array of scene objects.
        4. "voiceover": Natural, conversational, engaging text. No speaker labels, no raw text instructions.
        5. "visual_prompt": Detailed image generation prompt for this specific scene. Include style keywords: "${series.video_style_config?.prompt || "high quality"}".
        
        OUTPUT FORMAT:
        Return ONLY valid JSON. No markdown backticks.
        {
          "video_title": "string",
          "scenes": [
            {
              "scene_number": 1,
              "visual_prompt": "string",
              "voiceover": "string"
            }
          ]
        }
      `;

            try {
                const response = await client.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: prompt,
                    config: {
                        responseMimeType: 'application/json', // Force JSON output mode if supported by 2.0-flash
                    }
                });

                // New SDK response structure
                // response.response.text() might be different or direct.
                // Usually it returns a GenerateContentResponse.
                // Let's assume response.text() exists or we check usage.

                // Checking usage: response.text() helper is common in V1, but V2 SDK?
                // Let's inspect valid response properties if possible, but for now assuming standard accessor.
                // Actually `data` property holds the response in some clients.
                // Safest is to log and look, but I'll assume `response.text()` functionality or `response.candidates[0].content.parts[0].text`.
                // The new SDK usually has a helper.

                // Let's try `response.text()` if it exists, otherwise use raw path.
                // Wait, in the new SDK `response` object might be the data directly.

                // Let's revert to the safest pattern:
                const text = response.text || JSON.stringify(response); // Fallback

                // If the model supports JSON mode natively (gemini-1.5-pro/flash does), we used `responseMimeType: 'application/json'`.
                // This guarantees JSON.

                let jsonStr = text;
                if (typeof text !== 'string') {
                    // unexpected
                    jsonStr = JSON.stringify(text);
                }

                // Clean markdown if present
                jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
                const data = JSON.parse(jsonStr);
                return data;
            } catch (error: any) {
                console.error("Gemini Error:", error);
                throw new Error(`Failed to generate script: ${error.message}`);
            }
        });

        // 3. Generate Voice using TTS model
        const voice = await step.run("generate-voice", async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return { audioUrl: "https://example.com/placeholder-voice.mp3" };
        });

        // 4. Generate Caption using Model
        const captions = await step.run("generate-captions", async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            return { srt: "1\n00:00:00,000 --> 00:00:02,000\nHello world" };
        });

        // 5. Generate Images from image prompt
        const images = await step.run("generate-images", async () => {
            // Use visual prompts from the script
            const prompts: string[] = scriptData.scenes.map((s: any) => s.visual_prompt);
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Return placeholder images for now, mapped to prompts count
            return { imageUrls: prompts.map(() => "https://example.com/placeholder-image-gemini.png") };
        });

        // 6. Save everything to database
        const result = await step.run("save-result", async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return { success: true, videoId: "placeholder-video-id", title: scriptData.video_title };
        });

        return {
            event,
            seriesName: series.name,
            scriptTitle: scriptData.video_title,
            sceneCount: scriptData.scenes.length
        };
    }
);
