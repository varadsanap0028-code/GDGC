import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-frame bg-panel px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0">
      <div className="flex items-center gap-2.5">
        <span className="font-headline font-bold uppercase tracking-widest text-frame text-lg">
          {APP.name}
        </span>
        <span className="font-mono text-xs font-semibold px-1.5 py-0.5 border border-frame text-frame bg-canvas select-none">
          {APP.version}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-frame">
        {children}
      </div>
    </header>
  );
}
