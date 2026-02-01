import { GoogleGenAI, Type } from "@google/genai";

/* ---------------- LANGUAGE PROMPT MAP ---------------- */

const languagePromptMap = {
  en: "Respond only in English.",
  mr: "फक्त मराठीत उत्तर द्या. इंग्रजी शब्द वापरू नका.",
  hi: "केवल हिंदी में उत्तर दें। अंग्रेज़ी शब्दों का प्रयोग न करें।"
};

/* ---------------- API KEY ---------------- */

const API_KEY = (process as any).env.API_KEY || "";

/* ---------------- MAIN FUNCTION ---------------- */

export const analyzeCropImage = async (
  base64Image: string,
  language: "en" | "mr" | "hi"
) => {
  if (!API_KEY) {
    throw new Error(
      "Gemini API key is missing. Please set API_KEY in your .env file."
    );
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image
          }
        },
        {
          text: `
You are an expert agronomist.

${languagePromptMap[language]}

कार्य:
1. पिकावरील रोग ओळखा
2. तीव्रता (कमी / मध्यम / जास्त) सांगा
3. लक्षणे सोप्या व शेतकरी-अनुकूल भाषेत स्पष्ट करा
4. प्रतिबंध व उपचार सांगा

महत्वाचे:
- भाषा मिसळू नका
- निवडलेली भाषा काटेकोरपणे पाळा
- JSON मधील सर्व मूल्ये फक्त निवडलेल्या भाषेत असावीत
- जर मराठी निवडलेली असताना इंग्रजी शब्द आढळले तर उत्तर पुन्हा मराठीत तयार करा
`
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          disease: { type: Type.STRING },
          severity: { type: Type.STRING },
          description: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          confidence: { type: Type.NUMBER }
        },
        required: [
          "disease",
          "severity",
          "description",
          "recommendations",
          "confidence"
        ]
      }
    }
  });

  return JSON.parse(response.text);
};
