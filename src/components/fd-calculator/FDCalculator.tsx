"use client";

import { useMemo, useState } from "react";
import { calculateFD, getEffectiveAnnualRate } from "@/lib/fd/calculations";
import { clamp } from "@/lib/fd/formatters";
import type { PayoutFrequency } from "@/lib/fd/types";
import FDInputPanel from "./FDInputPanel";
import FDResultsPanel from "./FDResultsPanel";

const FDCalculator = () => {
  const [deposit, setDeposit] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [payout, setPayout] = useState<PayoutFrequency>("quarterly");

  const results = useMemo(
    () => calculateFD(deposit, rate, years, payout),
    [deposit, rate, years, payout]
  );

  const cumulativeRate = useMemo(
    () => getEffectiveAnnualRate(rate, payout),
    [rate, payout]
  );

  const handleCalculate = () => {
    setDeposit((d) => clamp(d, 10000, 5000000));
    setRate((r) => clamp(r, 5, 30));
    setYears((y) => clamp(Math.round(y), 1, 50));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-3 py-6 font-sans sm:px-5 sm:py-8 md:px-6 lg:py-12">
      <div className="mx-auto w-full max-w-[1360px] overflow-hidden rounded-2xl bg-white shadow-lg sm:rounded-3xl sm:w-[95%] md:w-[93%] lg:w-[91%] xl:max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-stretch">
          <FDInputPanel
            deposit={deposit}
            rate={rate}
            years={years}
            payout={payout}
            cumulativeRate={cumulativeRate}
            onDepositChange={setDeposit}
            onRateChange={setRate}
            onYearsChange={setYears}
            onPayoutChange={setPayout}
            onCalculate={handleCalculate}
          />
          <FDResultsPanel results={results} selectedYear={years} />
        </div>
      </div>
    </div>
  );
};

export default FDCalculator;
