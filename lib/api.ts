import { RoastRequest, RoastResult } from "@/types/roast";

export async function requestRoast(payload: RoastRequest): Promise<RoastResult> {
  let response: Response;
  try {
    response = await fetch("/api/roast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Could not reach the server. Is `npm run dev` still running?"
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok || !data) {
    const errorMsg =
      (data as { error?: string })?.error ||
      `Server error (${response.status}).`;
    throw new Error(errorMsg);
  }

  return data as RoastResult;
}
