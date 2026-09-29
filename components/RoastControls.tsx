import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 lg:gap-4 font-mono text-xs">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-2">
        <span className="text-frame/70 uppercase tracking-wider font-semibold">
          Roast Level:
        </span>
        <div className="flex items-center gap-2" role="radiogroup" aria-label="Roast Level">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className="flex items-center gap-1.5 cursor-pointer select-none group"
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  disabled={isRoasting}
                  className="sr-only"
                />
                <span
                  className={`w-3.5 h-3.5 border border-frame flex items-center justify-center transition-colors ${
                    isSelected ? "bg-frame" : "bg-panel group-hover:border-accent"
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-canvas" />}
                </span>
                <span
                  className={`uppercase tracking-tight font-medium ${
                    isSelected ? "text-frame font-bold" : "text-frame/70 group-hover:text-frame"
                  }`}
                >
                  {level.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="h-4 w-px bg-subtle hidden sm:block" />

      {/* 2. Language Dropdown */}
      <div className="flex items-center gap-1.5">
        <label htmlFor="language-select" className="text-frame/70 uppercase tracking-wider font-semibold">
          Language:
        </label>
        <div className="relative inline-block">
          <select
            id="language-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            disabled={isRoasting}
            className="appearance-none bg-panel border border-frame text-frame font-mono text-xs uppercase px-2.5 py-1 pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label} (.{lang.extension})
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-frame text-[10px]">
            ▼
          </span>
        </div>
      </div>

      <div className="h-4 w-px bg-subtle hidden sm:block" />

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        disabled={isRoasting}
        className={`px-2.5 py-1 font-mono text-xs uppercase transition-colors border ${
          errorDrawerOpen
            ? "bg-frame text-canvas border-frame font-bold"
            : "bg-panel text-frame border-dashed border-frame hover:bg-canvas"
        } disabled:opacity-50`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary Roast Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`px-3.5 py-1.5 font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 border border-frame transition-all shadow-[2px_2px_0px_#111111] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none ${
          isRoasting
            ? "bg-frame/80 text-canvas animate-pulse cursor-not-allowed"
            : "bg-accent text-white hover:bg-accent/90"
        }`}
      >
        {isRoasting ? (
          <span>ANALYZING...</span>
        ) : (
          <>
            <span>ROAST MY CODE</span>
            <span className="px-1 py-0.5 border border-white/50 text-[10px] font-normal tracking-normal bg-black/20">
              Ctrl ⏎
            </span>
          </>
        )}
      </button>
    </div>
  );
}
