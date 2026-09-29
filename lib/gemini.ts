import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const rawMessage = error instanceof Error ? error.message : String(error);
  if (status === 400) {
    return `Invalid request to Gemini API (400). Please check your code input or schema. Details: ${rawMessage}`;
  }
  if (status === 403) {
    return `Authentication failed (403). Please verify your GEMINI_API_KEY in .env.local has valid permissions and AI Studio access.`;
  }
  if (status === 404) {
    return `Model not found (404). Please verify that the model "${AI.model}" in config/app.config.ts is available for your API key.`;
  }
  if (status === 429) {
    return `Rate limit exceeded (429). Gemini API quota reached. Please wait a few moments and try again, or check your quota in Google AI Studio.`;
  }
  if (status === 503) {
    return `Gemini service is temporarily overloaded (503). All retry attempts exhausted. Please try again shortly.`;
  }
  return `Gemini API error${status ? ` (${status})` : ""}: ${rawMessage}`;
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const text = response.text;
      if (!text || !text.trim()) {
        throw new Error("Received an empty response from Gemini API.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(text);
      } catch (parseErr) {
        throw new Error(
          `Failed to parse Gemini response as JSON: ${
            parseErr instanceof Error ? parseErr.message : String(parseErr)
          }`
        );
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: unknown) {
      lastError = err;
      const status =
        (err as { status?: number; statusCode?: number })?.status ??
        (err as { statusCode?: number })?.statusCode;

      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error(friendlyErrorMessage(503, lastError));
}
