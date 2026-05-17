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
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: message,
      })
      
      if (!response) {
        throw new Error('No response from AI')
      }

      return {
        response: {
          text: () => response.text()
        }
      }
    } catch (error) {
      console.error('Error in chatSession:', error)
      throw error
    }
  }
}
