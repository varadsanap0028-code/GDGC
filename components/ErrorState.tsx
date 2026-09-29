import React from "react";

interface ErrorStateProps {
  error?: string | null;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center font-mono">
      <div className="w-16 h-16 border-2 border-accent flex items-center justify-center text-3xl font-bold text-accent mb-4 bg-accent/10 select-none shadow-[2px_2px_0px_#D94826]">
        !
      </div>
      <h3 className="font-headline font-bold uppercase tracking-wider text-accent text-sm md:text-base mb-2">
        Analysis Failed
      </h3>
      <p className="text-frame/70 text-xs max-w-md leading-relaxed mb-5 break-words">
        {error || "An unknown error occurred during code evaluation."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="border border-frame bg-panel text-frame hover:bg-frame hover:text-canvas transition-colors px-4 py-2 font-bold uppercase tracking-wider text-xs shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
