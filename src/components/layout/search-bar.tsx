"use client";

import { Search } from "lucide-react";

export function SearchBar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex h-12 w-full items-center justify-between gap-2 rounded-[52px] border border-white/10 bg-[#0b0c0f] pl-4 pr-3 ${className}`}
    >
      <div className="flex min-w-0 w-full items-center gap-2">
        <Search size={20} className="shrink-0 text-muted" />
        <input
          type="text"
          placeholder="Search sounds, presets, midi"
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
      </div>
    </div>
  );
}
