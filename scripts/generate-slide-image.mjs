import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = resolve(__dirname, "../.env.local");
const env = readFileSync(envPath, "utf-8")
  .split("\n")
  .filter((l) => l && !l.startsWith("#"))
  .reduce((acc, line) => {
    const idx = line.indexOf("=");
    if (idx > 0) acc[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
    return acc;
  }, {});

const KEY = env.GOOGLE_API_KEY;
if (!KEY) {
  console.error("GOOGLE_API_KEY missing in .env.local");
  process.exit(1);
}

const [, , outFile, ...promptParts] = process.argv;
const userPrompt = promptParts.join(" ");

if (!outFile || !userPrompt) {
  console.error('Usage: node generate-slide-image.mjs <out-file.png> "<prompt>"');
  process.exit(1);
}

const outPath = resolve(__dirname, "..", outFile);
mkdirSync(dirname(outPath), { recursive: true });

// Always prepend Forendors brand system to the prompt
const brandSpec = readFileSync(resolve(__dirname, "forendors-brand.md"), "utf-8");
const prompt = `${brandSpec}\n\n---\n\nIllustration request (must strictly follow the brand system above):\n\n${userPrompt}`;

const MODEL = "gemini-2.5-flash-image";
const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;

console.log(`[gen] ${outFile}`);
console.log(`[prompt] ${prompt.slice(0, 120)}${prompt.length > 120 ? "..." : ""}`);

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["IMAGE"] },
  }),
});

if (!res.ok) {
  const body = await res.text();
  console.error("API error:", res.status, body.slice(0, 500));
  process.exit(1);
}

const data = await res.json();
const parts = data?.candidates?.[0]?.content?.parts || [];
const imagePart = parts.find((p) => p.inlineData?.data);

if (!imagePart) {
  console.error("No image returned. Response:", JSON.stringify(data).slice(0, 800));
  process.exit(1);
}

const buf = Buffer.from(imagePart.inlineData.data, "base64");
writeFileSync(outPath, buf);
console.log(`[saved] ${outPath} (${(buf.length / 1024).toFixed(1)} kB)`);
