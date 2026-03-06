import { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { get, set } from 'idb-keyval';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function useGeneratedImage(prompt: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchImage() {
      try {
        setLoading(true);
        const cacheKey = `img_${prompt}`;
        const cached = await get(cacheKey);
        
        if (cached) {
          if (isMounted) {
            setImageUrl(cached);
            setLoading(false);
          }
          return;
        }

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: prompt,
          config: {
            imageConfig: { aspectRatio: "16:9" }
          }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || 'image/jpeg';
            const dataUrl = `data:${mimeType};base64,${base64EncodeString}`;
            
            await set(cacheKey, dataUrl);
            
            if (isMounted) {
              setImageUrl(dataUrl);
              setLoading(false);
            }
            return;
          }
        }
        
        throw new Error("No image data returned from model");
      } catch (err) {
        console.error("Failed to generate image:", err);
        if (isMounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    }

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [prompt]);

  return { imageUrl, loading, error };
}
