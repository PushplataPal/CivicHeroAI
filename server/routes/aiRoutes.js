import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

router.post("/categorize", async (req, res) => {
  try {
    // Debug: API key check
    console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY);

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const { description } = req.body;

   const prompt = `
You are an AI assistant for a civic issue reporting app.

Analyze this issue description:
"${description}"

Return ONLY valid JSON in this format:

{
  "category": "Road Damage / Water Leakage / Street Light / Waste Management / Other",
  "severity": "Low / Medium / High",
  "suggestion": "A short practical solution or action plan"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("Gemini Response:", response);

    // Response text nikalo
    const text = response.text;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleaned);

    res.json(result);

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.status(500).json({
      error: error.message,
    });
  }
});
router.post("/predict", async (req, res) => {
  try {
    const { issues } = req.body;

    const prompt = `
You are an AI civic analyst.

Based on these community issues:

${JSON.stringify(issues)}

Give a short prediction about possible future problems or maintenance needs.

Keep the response under 50 words.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      prediction: response.text,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Prediction failed",
    });
  }
});

export default router;