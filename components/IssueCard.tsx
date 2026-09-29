import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const SEVERITY_STYLES: Record<Severity, { badge: string }> = {
  "FATAL BUG": {
    badge: "border-accent text-accent bg-accent/10",
  },
  "CODE SMELL": {
    badge: "border-amber-600 text-amber-700 bg-amber-500/10",
  },
  "OPTIMIZATION": {
    badge: "border-emerald-600 text-emerald-700 bg-emerald-500/10",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const indexChip = String(index + 1).padStart(2, "0");
  const severityStyle =
    SEVERITY_STYLES[issue.severity] ?? SEVERITY_STYLES["CODE SMELL"];

  return (
    <div className="border border-frame bg-panel p-3 shadow-[2px_2px_0px_#111111] mb-3 font-mono text-xs">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-frame/20 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="bg-frame text-canvas px-1.5 py-0.5 text-[10px] font-bold">
            #{indexChip}
          </span>
          <span className="font-bold text-frame uppercase tracking-wider text-[11px]">
            LINE {issue.line}
          </span>
          <span
            className={`px-1.5 py-0.5 border text-[10px] font-bold uppercase tracking-wider ${severityStyle.badge}`}
          >
            {issue.severity}
          </span>
        </div>
        <div className="text-right text-frame/70 text-[11px] font-medium break-words max-w-full sm:max-w-[50%]">
          {issue.title}
        </div>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <pre className="border border-frame/20 border-l-4 border-l-accent bg-canvas/50 p-2 text-xs overflow-x-auto my-2 text-frame">
          <code>{issue.codeSnippet}</code>
        </pre>
      )}

      {/* Diagnosis & Expected */}
      <div className="flex flex-col gap-1.5 pt-1 text-xs">
        <div className="text-frame/90">
          <span className="font-bold text-accent mr-1">✕</span>
          <span className="font-semibold uppercase tracking-wider text-[10px] text-accent mr-1.5">
            Diagnosis:
          </span>
          <span>{issue.diagnosis}</span>
        </div>
        <div className="text-frame/90">
          <span className="font-bold text-emerald-600 mr-1">✓</span>
          <span className="font-semibold uppercase tracking-wider text-[10px] text-emerald-600 mr-1.5">
            Expected:
          </span>
          <span>{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
