"use client";

import { useCallback, useEffect, useState } from "react";
import { clamp, formatWithCommas } from "@/lib/fd/formatters";

export type SliderFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  midLabel: string;
  formatRange: (v: number) => string;
  onChange: (v: number) => void;
  inputSuffix?: string;
  decimals?: number;
  useCommas?: boolean;
};

const SliderField = ({
  label,
  value,
  min,
  max,
  step,
  midLabel,
  formatRange,
  onChange,
  inputSuffix = "",
  decimals = 0,
  useCommas = false,
}: SliderFieldProps) => {
  const formatDraft = (v: number) => {
    if (useCommas) return formatWithCommas(v);
    if (decimals > 0) {
      return Number.isInteger(v) ? String(v) : v.toFixed(decimals);
    }
    return String(Math.round(v));
  };

  const [draft, setDraft] = useState(() => formatDraft(value));
  const [isEditing, setIsEditing] = useState(false);
  const percent = ((value - min) / (max - min)) * 100;

  useEffect(() => {
    if (!isEditing) setDraft(formatDraft(value));
  }, [value, isEditing, decimals, useCommas]);

  const commitDraft = useCallback(() => {
    const parsed = parseFloat(draft.replace(/,/g, ""));
    if (!Number.isNaN(parsed)) {
      onChange(clamp(parsed, min, max));
    } else {
      setDraft(formatDraft(value));
    }
    setIsEditing(false);
  }, [draft, min, max, onChange, value, decimals, useCommas]);

  const handleSliderChange = (v: number) => {
    onChange(v);
    setDraft(formatDraft(v));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <span className="text-sm font-medium text-[#4a4a4a]">{label}</span>
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            inputMode="decimal"
            value={draft}
            onFocus={() => setIsEditing(true)}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitDraft}
            onKeyDown={(e) => e.key === "Enter" && commitDraft()}
            className="w-full rounded-full border border-[#ebebeb] bg-[#F3F3F3] px-4 py-2.5 pr-6 text-right text-sm font-medium text-[#333] outline-none focus:border-[#B99470]/50 focus:ring-2 focus:ring-[#B99470]/30 sm:w-32"
          />
          {inputSuffix && (
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#888]">
              {inputSuffix}
            </span>
          )}
        </div>
      </div>
      <div className="relative pt-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => handleSliderChange(Number(e.target.value))}
          className="fd-slider w-full touch-pan-x"
          style={
            { "--slider-percent": `${percent}%` } as React.CSSProperties
          }
        />
      </div>
      <div className="flex justify-between gap-1 text-[10px] text-[#999] sm:text-xs">
        <span className="shrink-0">{formatRange(min)}</span>
        <span className="truncate text-center">{midLabel}</span>
        <span className="shrink-0">{formatRange(max)}</span>
      </div>
    </div>
  );
};

export default SliderField;
