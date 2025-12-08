import { GoogleGenAI, Type } from "@google/genai";
import { Language, ChatMessage } from "../types";

// Initialize the Google GenAI client
// The API key is injected by Vite at build time via process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const GENERATION_CONFIG = {
  temperature: 0.1,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 2048,
};

// 1. Basic Word Prediction
export const getPredictions = async (input: string, language: Language): Promise<string[]> => {
  if (!input || input.trim().length === 0) return [];

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Current Input: "${input}"
      Task: Predict the next 3 most likely words or completions.`,
      config: {
        ...GENERATION_CONFIG,
        systemInstruction: `You are an assistive text prediction engine. Language: ${language}. Output: A JSON array of strings only. Example: ["hello", "how", "are"]`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const predictions = JSON.parse(jsonText);
    return Array.isArray(predictions) ? predictions.slice(0, 4) : [];
  } catch (error) {
    console.error("Prediction service error:", error);
    return [];
  }
};

// 2. Smart Reply based on Conversation History
export const getSmartReplies = async (history: ChatMessage[], language: Language): Promise<string[]> => {
  if (history.length === 0) return ["Hello", "Yes", "No", "Thank you"];

  try {
    const context = history.slice(-5).map(m => `${m.sender}: ${m.text}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Conversation History:
      ${context}
      
      Task: Suggest 4 short, relevant, quick responses for the user to say next.`,
      config: {
        ...GENERATION_CONFIG,
        systemInstruction: `You are an assistive communication aid for a patient with ALS. Language: ${language}. Output: A JSON array of strings only.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return ["Yes", "No", "Thanks"];

    const replies = JSON.parse(jsonText);
    return Array.isArray(replies) ? replies.slice(0, 4) : ["Yes", "No", "Thanks"];
  } catch (error) {
    console.error("Smart reply error:", error);
    return ["I agree", "Can you help?", "Wait", "Okay"];
  }
};

// 3. Visual Context Suggestions
export const getVisualSuggestions = async (imageBase64: string, language: Language): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Updated to correct model for images
      contents: {
        parts: [
            { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
            { text: `Analyze this image and suggest 4 short phrases I might want to say about it. Return ONLY a JSON array of strings.` }
        ]
      },
      config: {
        ...GENERATION_CONFIG,
        systemInstruction: `You are an assistive communication aid. Language: ${language}. Keep phrases short and conversational.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];

    const suggestions = JSON.parse(jsonText);
    return Array.isArray(suggestions) ? suggestions.slice(0, 4) : [];

  } catch (error) {
    console.error("Visual suggestion error:", error);
    return ["I see something", "What is that?", "Look at this", "Okay"];
  }
};