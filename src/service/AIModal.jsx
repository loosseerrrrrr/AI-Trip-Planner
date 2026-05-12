import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
})

export const chatSession = {
  sendMessage: async (message) => {
    const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-lite",
  contents: message,
})
    return {
      response: {
        text: () => response.text
      }
    }
  }
}