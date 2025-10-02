import { GoogleGenAI, Modality } from "@google/genai";
import type { Pose, Framing, Outfit } from '../App';

const POSE_PROMPTS: Record<Pose, string> = {
    default: 'The person looks directly at the camera, and the subject\'s body is also directly facing the camera.',
    armsCrossed: 'The person looks directly at the camera while standing with their arms confidently crossed, conveying a sense of assertiveness and professionalism.',
    thinking: 'The person looks directly at the camera with a thoughtful expression, perhaps with a hand gently touching their chin, suggesting intellect and strategy.'
};

const FRAMING_PROMPTS: Record<Framing, string> = {
    chestUp: 'The subject is framed from the chest up, with ample headroom and negative space above their head, ensuring the top of their head is not cropped.',
    halfBody: 'A half-body shot, capturing the person from the waist up, showing more of their attire and professional posture in the studio setting.',
    fullBody: 'A full-body studio shot, capturing the person from head to toe, showcasing their complete professional attire and confident stance.'
};

const OUTFIT_PROMPTS: Record<Outfit, string> = {
    blazer: 'a smart casual blazer',
    suit: 'a formal business suit',
    shirt: 'a crisp button-down shirt',
    turtleneck: 'a stylish turtleneck sweater for a creative professional look'
};


const BASE_PROMPT = `A professional, high-resolution, profile photo, maintaining the exact facial structure, identity, and key features of the person in the input image. {FRAMING} {POSE} They are styled for a professional photo studio shoot, wearing {OUTFIT}. The background is a solid '#141414' neutral studio. {ANGLE} with bright and airy soft, diffused studio lighting, gently illuminating the face and creating a subtle catchlight in the eyes, conveying a sense of clarity. Captured on an 85mm f/1.8 lens with a shallow depth of field, exquisite focus on the eyes, and beautiful, soft bokeh. Observe crisp detail on the fabric texture of the clothing, individual strands of hair, and natural, realistic skin texture. The atmosphere exudes confidence, professionalism, and approachability. Clean and bright cinematic color grading with subtle warmth and balanced tones, ensuring a polished and contemporary feel.`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateProfessionalPhoto(
  base64ImageData: string,
  mimeType: string,
  pose: Pose,
  framing: Framing,
  outfit: Outfit
): Promise<string | null> {
  try {
    const posePrompt = POSE_PROMPTS[pose] || POSE_PROMPTS.default;
    const framingPrompt = FRAMING_PROMPTS[framing] || FRAMING_PROMPTS.chestUp;
    const outfitPrompt = OUTFIT_PROMPTS[outfit] || OUTFIT_PROMPTS.blazer;
    
    const anglePrompt = framing === 'fullBody' 
      ? 'Shot from an eye-level angle' 
      : 'Shot from a high angle';

    const finalPrompt = BASE_PROMPT
        .replace('{FRAMING}', framingPrompt)
        .replace('{POSE}', posePrompt)
        .replace('{OUTFIT}', outfitPrompt)
        .replace('{ANGLE}', anglePrompt);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    return null;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate image due to an API error.");
  }
}