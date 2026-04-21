import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";

// Load the key from your .env file
const env = fs.readFileSync(".env", "utf8");
const key = env.match(/VITE_GEMINI_API_KEY=(.*)/)?.[1]?.trim();

const modelsToTest = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro",
  "gemini-1.5-pro-latest",
  "gemini-pro",
  "gemini-1.0-pro"
];

async function testAllModels() {
  if (!key) {
    console.error("❌ ERROR: No API Key found in .env file.");
    return;
  }
  
  console.log("🔍 PROBING GEMINI ENDPOINTS...");
  const genAI = new GoogleGenerativeAI(key);

  for (const m of modelsToTest) {
    try {
      console.log(`\nTesting [${m}]...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Respond with 'OK'");
      console.log(`✅ SUCCESS: ${m} responded: ${result.response.text().trim()}`);
    } catch (e) {
      console.error(`❌ FAILED: ${m} -> ${e.message.split('\n')[0]}`);
    }
  }
}

testAllModels();
