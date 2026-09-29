import { NextRequest, NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const code = typeof body.code === "string" ? body.code : "";
  const errorMessage =
    typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  // Validate in order
  if (!code.trim()) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }

  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength} characters.`,
      },
      { status: 400 }
    );
  }

  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength} characters.`,
      },
      { status: 400 }
    );
  }

  // Fallback to defaults if language / roastLevel is unknown
  const validLanguages = LANGUAGES.map((l) => l.id as string);
  const validRoastLevels = ROAST_LEVELS.map((r) => r.id as string);

  const language = (
    typeof body.language === "string" && validLanguages.includes(body.language)
      ? body.language
      : DEFAULTS.language
  ) as LanguageId;

  const roastLevel = (
    typeof body.roastLevel === "string" &&
    validRoastLevels.includes(body.roastLevel)
      ? body.roastLevel
      : DEFAULTS.roastLevel
  ) as RoastLevel;

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage: errorMessage || undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("API /api/roast error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
