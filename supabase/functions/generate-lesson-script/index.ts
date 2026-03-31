import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, subject, gradeLevel } = await req.json();
    if (!topic || !subject) {
      return new Response(JSON.stringify({ error: "topic and subject are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert educational content creator for students. Generate a structured video lesson script with exercise checkpoints.

IMPORTANT: Return ONLY valid JSON with NO markdown formatting, NO code blocks, NO backticks. Just raw JSON.

Return a JSON object with this structure:
{
  "title": "Lesson title",
  "slides": [
    {
      "heading": "Slide heading",
      "content": "2-3 sentence explanation for this slide",
      "narration": "What the AI teacher would say for this slide (3-5 sentences, conversational and engaging)",
      "visualType": "concept" | "example" | "diagram" | "summary" | "intro",
      "exercise": null
    }
  ]
}

For exactly 2 slides (not the first or last), add an exercise checkpoint. Set the "exercise" field to:
{
  "question": "A question testing understanding of this slide's content",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 0
}
The correctIndex is the 0-based index of the correct option.

Guidelines:
- Create exactly 6-8 slides
- First slide should be an engaging introduction
- Last slide should be a summary/recap
- Place exercises after concept or example slides (never on intro or summary)
- Narration should be warm, encouraging, and age-appropriate for grade ${gradeLevel || "9"}
- Each slide's narration should be 20-40 words (for ~10-15 seconds of speech)
- Make it feel like a real teacher explaining to a student
- Use simple, clear language
- Exercise questions should directly test what was just taught`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Create a video lesson about "${topic}" for the subject "${subject}".` },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content returned from AI");
    }

    // Parse the JSON from the response
    let lessonScript;
    try {
      // Try to extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
      const jsonStr = jsonMatch ? jsonMatch[1].trim() : content.trim();
      lessonScript = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse lesson script");
    }

    return new Response(JSON.stringify(lessonScript), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-lesson-script error:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
