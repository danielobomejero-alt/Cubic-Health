// Hero image service — uses a high-quality placeholder.
// An AI-generated illustration will be used once a GEMINI_API_KEY is configured.
export async function getHeroIllustration(): Promise<string> {
  const fallback = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80";

  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return fallback;
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey });

    const prompt =
      "A cheerful, vibrant digital illustration themed to Nigeria and Africa. A professional healthcare provider in a modern, warm home setting is consulting with a smiling patient. The scene is bright and optimistic. Surrounding the main characters are small, playful illustrations of fresh tropical fruits (like mangoes and pineapples), health metrics like a glowing heart pulse line, and a stethoscope. The style is clean, modern, and friendly, reflecting a proactive approach to health. High quality, 4k.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: { parts: [{ text: prompt }] },
    });

    for (const part of response.candidates[0].content.parts) {
      if ((part as any).inlineData) {
        return `data:image/png;base64,${(part as any).inlineData.data}`;
      }
    }
  } catch (e) {
    console.warn("Image generation failed, using fallback.", e);
  }

  return fallback;
}
