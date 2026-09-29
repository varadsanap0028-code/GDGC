import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center font-mono">
      <div className="w-16 h-16 border-2 border-dashed border-frame/40 flex items-center justify-center text-2xl font-bold text-frame/40 mb-4 bg-canvas/40 select-none">
        &#123;&#125;
      </div>
      <h3 className="font-headline font-bold uppercase tracking-wider text-frame text-sm md:text-base mb-2">
        Awaiting Code Submission
      </h3>
      <p className="text-frame/60 text-xs max-w-sm leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press
        Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}
