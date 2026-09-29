import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center font-mono">
      <div className="w-16 h-16 border-2 border-frame flex items-center justify-center text-2xl font-bold text-frame mb-4 bg-canvas/40 select-none shadow-[2px_2px_0px_#111111]">
        <span className="inline-block animate-spin">/</span>
      </div>
      <h3 className="font-headline font-bold uppercase tracking-wider text-frame text-sm md:text-base mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="text-frame/60 text-xs max-w-sm leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
