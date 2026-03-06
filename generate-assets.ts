import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No API key found in process.env.GEMINI_API_KEY");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function generateImage(prompt: string, filename: string) {
  console.log(`Generating ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: {
        imageConfig: { aspectRatio: "16:9" }
      }
    });
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        fs.writeFileSync(filename, buffer);
        console.log(`Saved ${filename}`);
        return;
      }
    }
    console.log(`No image data found for ${filename}`);
  } catch (e) {
    console.error(`Failed to generate ${filename}:`, e);
  }
}

async function main() {
  if (!fs.existsSync('./public')) fs.mkdirSync('./public');
  if (!fs.existsSync('./public/assets')) fs.mkdirSync('./public/assets');

  const prompts = [
    "Abstract 3D mechanical gears and data streams, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
    "Abstract 3D digital wallet vault, geometric shapes, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
    "Abstract 3D aviation turbine engine, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
    "Abstract 3D blockchain nodes connecting, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
    "Abstract 3D server racks and glowing data cubes, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist",
    "Abstract 3D human brain made of glowing circuits, dark background, neon orange accents, high-end 3D render, kinetic motion, cinematic lighting, minimalist"
  ];

  for (let i = 0; i < prompts.length; i++) {
    await generateImage(prompts[i], `./public/assets/exp-${i+1}.jpg`);
  }
}

main();
