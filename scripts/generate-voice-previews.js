const { createClient } = require("@deepgram/sdk");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const DEEPGRAM_VOICES = [
    { modelName: "aura-2-odysseus-en", filename: "deepgram-aura-2-odysseus-en.wav" },
    { modelName: "aura-2-thalia-en", filename: "deepgram-aura-2-thalia-en.wav" },
    { modelName: "aura-2-amalthea-en", filename: "deepgram-aura-2-amalthea-en.wav" },
    { modelName: "aura-2-andromeda-en", filename: "deepgram-aura-2-andromeda-en.wav" },
    { modelName: "aura-2-apollo-en", filename: "deepgram-aura-2-apollo-en.wav" }
];

const SAMPLE_TEXT = "Hello! This is a preview of my voice for your video series using Deepgram.";

async function generatePreviews() {
    console.log("Generating Deepgram voice previews...");

    if (!process.env.DEEPGRAM_API_KEY) {
        console.error("Error: DEEPGRAM_API_KEY not found in .env.local");
        return;
    }

    for (const voice of DEEPGRAM_VOICES) {
        console.log(`Generating preview for ${voice.modelName}...`);
        try {
            const response = await deepgram.speak.request(
                { text: SAMPLE_TEXT },
                {
                    model: voice.modelName,
                    encoding: "linear16",
                    container: "wav",
                }
            );

            const stream = await response.getStream();
            if (stream) {
                const buffer = await streamToBuffer(stream);
                const outputPath = path.join("public", "voice", voice.filename);
                fs.writeFileSync(outputPath, buffer);
                console.log(`Saved: ${outputPath}`);
            } else {
                console.error("Error: No stream returned");
            }
        } catch (error) {
            console.error(`Failed to generate ${voice.modelName}:`, error.message);
        }
    }
    console.log("Finished generating previews!");
}

function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
    });
}

generatePreviews();
