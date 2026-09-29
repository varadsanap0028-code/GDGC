import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b-2 border-frame bg-canvas/80 px-4 py-2.5 flex flex-col gap-1.5 shrink-0">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="uppercase tracking-wider font-semibold text-frame/80 text-[11px]">
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-frame/60 hover:text-accent font-mono text-xs uppercase transition-colors"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`TypeError: unsupported operand type(s) for +=: 'int' and 'list'
  File "main.py", line 4, in calculate_average`}
        className="w-full bg-panel border border-frame p-2 font-mono text-xs text-frame placeholder:text-frame/40 focus:outline-none focus:ring-1 focus:ring-accent resize-none"
        spellCheck={false}
      />
    </div>
  );
}
