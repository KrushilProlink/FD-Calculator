"use client";

import { PRIMARY_TAN } from "@/lib/fd/constants";
import { formatRangeDeposit } from "@/lib/fd/formatters";
import type { PayoutFrequency } from "@/lib/fd/types";
import InterestPayoutSelector from "./InterestPayoutSelector";
import SliderField from "./SliderField";

type FDInputPanelProps = {
  deposit: number;
  rate: number;
  years: number;
  payout: PayoutFrequency;
  cumulativeRate: number;
  onDepositChange: (v: number) => void;
  onRateChange: (v: number) => void;
  onYearsChange: (v: number) => void;
  onPayoutChange: (id: PayoutFrequency) => void;
  onCalculate: () => void;
};

const FDInputPanel = ({
  deposit,
  rate,
  years,
  payout,
  cumulativeRate,
  onDepositChange,
  onRateChange,
  onYearsChange,
  onPayoutChange,
  onCalculate,
}: FDInputPanelProps) => (
  <div className="space-y-6 p-5 sm:space-y-7 sm:p-8 lg:p-11">
    <div>
      <h1
        className="text-xl font-bold tracking-tight sm:text-2xl lg:text-[26px]"
        style={{ color: PRIMARY_TAN }}
      >
        FD Calculator
      </h1>
      <p className="mt-1.5 text-xs leading-relaxed text-[#999] sm:text-sm">
        Estimates how much your fixed deposit investment will grow over time.
      </p>
    </div>

    <div className="space-y-5 sm:space-y-6">
      <SliderField
        label="Deposit Amount (₹)"
        value={deposit}
        min={10000}
        max={5000000}
        step={10000}
        midLabel="₹25L"
        formatRange={formatRangeDeposit}
        onChange={onDepositChange}
        useCommas
      />
      <SliderField
        label="Rate Of Return (%)"
        value={rate}
        min={5}
        max={30}
        step={0.1}
        midLabel="17.5%"
        formatRange={(v) => `${v}%`}
        onChange={onRateChange}
        decimals={1}
      />
      <InterestPayoutSelector
        payout={payout}
        cumulativeRate={cumulativeRate}
        onSelect={onPayoutChange}
      />
      <SliderField
        label="Time Period (Years)"
        value={years}
        min={1}
        max={50}
        step={1}
        midLabel="25 Years"
        formatRange={(v) => `${v}Y`}
        onChange={(v) => onYearsChange(Math.round(v))}
      />
    </div>

    <button
      type="button"
      onClick={onCalculate}
      className="w-full rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] sm:max-w-[220px]"
      style={{ backgroundColor: PRIMARY_TAN }}
    >
      Calculate
    </button>
  </div>
);

export default FDInputPanel;
