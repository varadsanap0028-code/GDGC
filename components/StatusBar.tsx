import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-frame bg-panel px-4 py-2 font-mono text-xs shrink-0 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
        {/* Left Side: Status & Engine */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-frame/70 font-semibold">STATUS:</span>
          {isRoasting ? (
            <span className="text-amber-600 font-bold animate-pulse">
              PROCESSING...
            </span>
          ) : (
            <span className="text-emerald-600 font-bold">
              ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}

          <span className="hidden sm:inline text-frame/30 mx-1">|</span>
          <span className="hidden sm:inline text-frame/70">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        {/* Right Side: App Name, Version & Live */}
        <div className="text-frame/70 uppercase tracking-widest text-[10px] sm:text-[11px] font-semibold text-right">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Workshop Credit Line */}
      <div className="text-center text-[10px] text-frame/50 pt-1 tracking-wider font-mono">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
