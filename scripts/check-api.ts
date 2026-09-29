import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`[CHECK:API] Testing connection to Gemini API using model "${AI.model}"...`);
  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n=== GEMINI API CHECK SUCCESSFUL ===");
    console.log(`Roast: ${result.roast}`);
    console.log(`Issues detected: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  #${idx + 1} [${issue.severity}] Line ${issue.line}: ${issue.title}`);
    });
    console.log(`Takeaway: ${result.takeaway}`);
    console.log("\nAPI connection is working perfectly!");
  } catch (error) {
    console.error("\n=== GEMINI API CHECK FAILED ===");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
