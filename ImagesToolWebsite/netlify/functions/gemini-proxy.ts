import { GoogleGenAI, Modality, Part } from "@google/genai";

// This function runs on Netlify's backend, where process.env is securely available.
const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  // This will cause the function to fail safely if the key is not set.
  throw new Error("Gemini API key not found on the server.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Netlify's handler function for incoming requests.
export const handler = async (event: { httpMethod: string; body: string }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { action, payload } = JSON.parse(event.body);
    let geminiResponse;

    switch (action) {
      case 'processImage': {
        const { base64Image, mimeType, prompt, maskBase64 } = payload;
        const parts: Part[] = [
          { inlineData: { data: base64Image, mimeType } },
        ];

        if (maskBase64) {
          parts.push({ inlineData: { data: maskBase64, mimeType: 'image/png' } });
        }

        parts.push({ text: prompt });

        geminiResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts },
          config: { responseModalities: [Modality.IMAGE] },
        });
        break;
      }

      case 'generateIcon': {
        const { prompt } = payload;
        const fullPrompt = `Generate a high-quality, modern, minimalist icon of ${prompt}. The icon should be on a transparent background, suitable for a web application. Vector style, clean lines.`;
        geminiResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: fullPrompt }] },
          config: { responseModalities: [Modality.IMAGE] },
        });
        break;
      }

      default:
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid action specified.' }) };
    }

    const responseParts = geminiResponse.candidates?.[0]?.content?.parts;
    if (!responseParts) {
      const finishReason = geminiResponse.candidates?.[0]?.finishReason;
      const errorMessage = `AI response did not contain content. Reason: ${finishReason}`;
      return { statusCode: 500, body: JSON.stringify({ error: errorMessage }) };
    }
    
    let resultBase64;
    for (const part of responseParts) {
      if (part.inlineData?.data) {
        resultBase64 = part.inlineData.data;
        break;
      }
    }
    
    if (!resultBase64) {
      return { statusCode: 500, body: JSON.stringify({ error: 'No image data found in the AI response.' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resultBase64 }),
    };

  } catch (error: any) {
    console.error('Error in Netlify function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'An internal server error occurred.' }),
    };
  }
};
