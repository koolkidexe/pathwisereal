import { supabase } from "@/integrations/supabase/client";

export interface SlideExercise {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface LessonSlide {
  heading: string;
  content: string;
  narration: string;
  visualType: "concept" | "example" | "diagram" | "summary" | "intro";
  exercise?: SlideExercise | null;
}

export interface LessonScript {
  title: string;
  slides: LessonSlide[];
}

export async function generateLessonScript(topic: string, subject: string, gradeLevel?: string): Promise<LessonScript> {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-lesson-script`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ topic, subject, gradeLevel }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(err.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

export async function generateNarration(text: string): Promise<string> {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts-narrate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ text }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "TTS failed" }));
    throw new Error(err.error || `TTS failed: ${response.status}`);
  }

  const data = await response.json();
  return data.audioContent;
}
