import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Route for generating compliment
app.post("/api/compliment", async (req, res) => {
  try {
    const { theme } = req.body;

    const prompt = `Give me a fun, creative, and kind compliment as if I were a ${theme}. 
Make it unique, and write in a natural, friendly tone.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ compliment: completion.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
