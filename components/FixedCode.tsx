"use client";

import React, { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  const ext =
    LANGUAGES.find((l) => l.id === language)?.extension ?? "txt";
  const filename = `solution.${ext}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    setTimeout(() => {
      setCopyStatus("idle");
    }, 2000);
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="font-mono text-xs mb-4">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-bold text-emerald-600 uppercase tracking-wider text-[11px]">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-frame bg-panel mb-3 shadow-[2px_2px_0px_#111111]">
        {/* Filename Header Strip */}
        <div className="border-b border-frame/20 bg-canvas/60 px-3 py-1.5 flex items-center justify-between text-[11px]">
          <span className="font-bold text-frame">{filename}</span>
          <span className="font-bold text-emerald-600 uppercase tracking-wider">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <pre className="p-3 text-xs overflow-x-auto text-frame font-mono leading-relaxed bg-panel max-h-[360px]">
          <code>{code}</code>
        </pre>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={handleCopy}
          className="border border-frame bg-panel text-frame hover:bg-frame hover:text-canvas transition-colors px-3 py-1.5 font-bold uppercase tracking-wider shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          {copyLabel}
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="border border-frame bg-panel text-frame hover:bg-frame hover:text-canvas transition-colors px-3 py-1.5 font-bold uppercase tracking-wider shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
