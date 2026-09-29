import React from "react";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { SectionHeader } from "./SectionHeader";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string | null;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  const hasFixedCode = Boolean(result?.correctedCode && result.correctedCode.trim());
  const hasTakeaway = Boolean(result?.takeaway && result.takeaway.trim());
  const takeawaySectionNumber = hasFixedCode ? 4 : 3;

  return (
    <div className="flex-1 flex flex-col bg-panel overflow-hidden min-h-[420px] lg:min-h-0">
      {/* 40px Header Strip */}
      <div className="h-10 border-b border-frame bg-canvas/40 px-3 flex items-center justify-between shrink-0 font-mono text-xs">
        <span className="text-frame/50 uppercase tracking-wider text-[11px] font-semibold">
          AUDIT // REPORT
        </span>
        <span className="font-headline font-bold uppercase tracking-wider text-frame">
          Roast Report
        </span>
        <div className="w-16" />
      </div>

      {/* Main Content Area */}
      {state === "loading" && <LoadingState />}
      {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}
      {state === "results" && result && (
        <div className="flex-1 overflow-y-auto p-4 flex flex-col font-mono text-xs">
          {/* Section 1: Roast */}
          <div className="mb-4">
            <SectionHeader number={1} title="Roast">
              <span className="uppercase tracking-wider font-semibold text-[11px] text-frame/70">
                STYLE: {roastLevel.toUpperCase()}
              </span>
            </SectionHeader>
            <blockquote className="border-l-4 border-frame bg-canvas/60 p-3 italic text-frame text-xs md:text-sm leading-relaxed">
              &quot;{result.roast}&quot;
            </blockquote>
          </div>

          {/* Section 2: What's Wrong */}
          <div className="mb-4">
            <SectionHeader number={2} title="What's Wrong">
              <span className="uppercase tracking-wider font-semibold text-[11px] text-frame/70">
                {result.issues.length === 1
                  ? "1 ISSUE"
                  : `${result.issues.length} ISSUES`}
              </span>
            </SectionHeader>

            {result.issues.length === 0 ? (
              <div className="border border-emerald-600 bg-emerald-500/10 text-emerald-700 p-3 font-mono text-xs font-bold uppercase tracking-wider">
                No issues found. Suspiciously clean.
              </div>
            ) : (
              result.issues.map((issue, idx) => (
                <IssueCard key={idx} index={idx} issue={issue} />
              ))
            )}
          </div>

          {/* Section 3: Fix */}
          {hasFixedCode && (
            <FixedCode
              sectionNumber={3}
              language={language}
              code={result.correctedCode}
              onApply={onApplyFix}
            />
          )}

          {/* Section 4 (or 3): Takeaway */}
          {hasTakeaway && (
            <div className="mb-2">
              <SectionHeader number={takeawaySectionNumber} title="Takeaway" />
              <div className="border border-frame bg-panel p-3 shadow-[2px_2px_0px_#111111] text-frame leading-relaxed text-xs">
                {result.takeaway}
              </div>
            </div>
          )}
        </div>
      )}
      {state === "empty" && <EmptyState />}
    </div>
  );
}
