"use client";

import React, { useRef, useState, useCallback } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const languageLabel =
    LANGUAGES.find((l) => l.id === language)?.label ?? language;

  const lineCount = Math.max(code.split("\n").length, 10);
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  const updateCursor = useCallback(
    (target: HTMLTextAreaElement) => {
      const pos = target.selectionStart ?? 0;
      const textBefore = target.value.slice(0, pos);
      const lineList = textBefore.split("\n");
      const line = lineList.length;
      const col = lineList[lineList.length - 1].length + 1;
      setCursorPos({ line, col });
    },
    []
  );

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    updateCursor(e.currentTarget);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    updateCursor(e.currentTarget);
  };

  const handleClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    updateCursor(e.currentTarget);
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);
      updateCursor(textarea);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-panel border-r-0 lg:border-r-2 border-frame overflow-hidden min-h-[420px] lg:min-h-0">
      {/* 40px Header Strip */}
      <div className="h-10 border-b border-frame bg-canvas/40 px-3 flex items-center justify-between shrink-0 font-mono text-xs">
        <span className="text-frame/50 uppercase tracking-wider text-[11px] font-semibold">
          INPUT // SRC
        </span>
        <span className="font-headline font-bold uppercase tracking-wider text-frame">
          Your Code
        </span>
        <div className="flex items-center gap-2 text-[11px]">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-frame/70 hover:text-accent hover:underline uppercase transition-colors"
          >
            SAMPLE BUG
          </button>
          <span className="text-frame/30">/</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-frame/70 hover:text-accent hover:underline uppercase transition-colors"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="flex-1 flex relative overflow-hidden bg-panel">
        {/* Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 shrink-0 bg-canvas/40 border-r border-frame/20 font-mono text-xs select-none overflow-hidden text-right pr-2.5 py-2 leading-6"
        >
          {lines.map((num) => {
            const isError = num === errorLine;
            return (
              <div
                key={num}
                className={`transition-colors ${
                  isError
                    ? "text-accent bg-accent/15 font-bold border-l-2 border-accent pl-0.5"
                    : "text-frame/40"
                }`}
              >
                {num}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onSelect={handleSelect}
          onKeyUp={handleKeyUp}
          onClick={handleClick}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder="// Paste your code here..."
          wrap="off"
          spellCheck={false}
          className="flex-1 bg-transparent p-2 font-mono text-xs text-frame resize-none focus:outline-none overflow-auto leading-6 whitespace-pre font-normal tracking-wide"
        />
      </div>

      {/* Bottom Status Strip */}
      <div className="h-7 border-t border-frame/20 bg-canvas/60 px-3 flex items-center justify-between font-mono text-[11px] text-frame/70 shrink-0">
        <div>
          Ln {cursorPos.line}, Col {cursorPos.col} · {languageLabel}
        </div>
        <div className="hidden sm:block text-frame/50">
          UTF-8 · Tab Size: 4
        </div>
      </div>
    </div>
  );
}
