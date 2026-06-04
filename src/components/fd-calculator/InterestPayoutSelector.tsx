"use client";

import { PAYOUT_OPTIONS, PRIMARY_TAN } from "@/lib/fd/constants";
import type { PayoutFrequency } from "@/lib/fd/types";

type InterestPayoutSelectorProps = {
  payout: PayoutFrequency;
  cumulativeRate: number;
  onSelect: (id: PayoutFrequency) => void;
};

const InterestPayoutSelector = ({
  payout,
  cumulativeRate,
  onSelect,
}: InterestPayoutSelectorProps) => (
  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
    <div className="min-w-0 shrink-0">
      <p className="text-sm font-medium text-[#a8a8a8]">Interest Payout</p>
      <p className="mt-1 text-xs leading-snug text-[#8fbc9a]">
        Cumulative Rate Of Return is{" "}
        <span className="font-semibold text-[#6fa87d]">
          {cumulativeRate.toFixed(2)}%
        </span>
      </p>
    </div>
    <div className="flex min-w-0 flex-wrap gap-2 xl:shrink-0 xl:flex-nowrap xl:justify-end">
      {PAYOUT_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onSelect(opt.id)}
          className={`rounded-full px-3 py-2 text-xs font-medium transition-colors sm:px-3.5 sm:py-2.5 sm:text-sm ${
            payout === opt.id
              ? "font-semibold text-white"
              : "bg-[#f0f0f0] text-[#7a7a7a] hover:bg-[#e8e8e8]"
          }`}
          style={
            payout === opt.id ? { backgroundColor: PRIMARY_TAN } : undefined
          }
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

export default InterestPayoutSelector;
