import { GoogleGenAI } from "@google/genai"

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  console.error('VITE_GEMINI_API_KEY is not set. Please add it to your .env file.')
}

const ai = new GoogleGenAI({ 
  apiKey: apiKey
})

export const chatSession = {
  sendMessage: async (message) => {

    try {

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
      })

      return {
        response: {
          text: () => result.text
        }
      }

    } catch (error) {

      console.error("AI Error:", error)
      throw error

    }
  }
}
