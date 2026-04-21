import fs from "fs";

// Load the Groq key from your .env file
const env = fs.readFileSync(".env", "utf8");
const key = env.match(/VITE_GROQ_API_KEY=(.*)/)?.[1]?.trim();

async function testGroq() {
  if (!key) {
    console.error("❌ ERROR: No Groq API Key found in .env file.");
    return;
  }
  
  console.log("🔍 PROBING GROQ (LLAMA-3) ENDPOINT...");
  
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: "Respond with 'GROQ_OK'" }]
      })
    });
    
    const data = await response.json();
    if (data.choices) {
      console.log(`✅ SUCCESS: Llama-3 responded: ${data.choices[0].message.content.trim()}`);
    } else {
      console.error("❌ FAILED: ", data.error?.message || "Unknown error");
    }
  } catch (e) {
    console.error(`❌ NETWORK ERROR: ${e.message}`);
  }
}

testGroq();
