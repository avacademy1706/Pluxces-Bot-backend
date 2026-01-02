
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { scrapeWebsite } from "./scraper.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

let WEBSITE_DATA = "";

// 🔹 Plexus Digitals website scrape
(async () => {
  WEBSITE_DATA = await scrapeWebsite("https://plexusdigitals.com");
  console.log("✅ Plexus Digitals website data loaded");
})();

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          {
            role: "system",
            content: `
You are an AI assistant for the Plexus Digitals website.
Answer ONLY using the website content below.

If the information is NOT available on the website, respond EXACTLY with:
"Please contact to this number for further details: +91-XXXXXXXXXX"

Website Content:
${WEBSITE_DATA}
              `,
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Please contact to this number for further details: +91-XXXXXXXXXX";

    res.json({ reply });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({
      reply:
        "Please contact to this number for further details: +91-XXXXXXXXXX",
    });
  }
});

app.listen(5000, () =>
  console.log("🚀 Plexus Digitals chatbot backend running on port 5000")
);
