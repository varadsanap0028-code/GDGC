import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({
  number,
  title,
  children,
}: SectionHeaderProps) {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b border-frame/30 pb-1 mb-2.5 font-mono text-xs">
      <span className="font-bold uppercase tracking-wider text-frame">
        {formattedNumber} // {title}
      </span>
      {children && <div className="text-frame/70">{children}</div>}
    </div>
  );
}
