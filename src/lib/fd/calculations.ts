import { FREQUENCY_MAP } from "./constants";
import type { FDResults, PayoutFrequency } from "./types";

const getCompoundingPeriods = (payout: PayoutFrequency): number =>
  FREQUENCY_MAP[payout];

export const calculateFD = (
  principal: number,
  annualRate: number,
  years: number,
  payout: PayoutFrequency
): FDResults => {
  const n = getCompoundingPeriods(payout);
  const r = annualRate / 100;
  const t = years;

  let maturity: number;
  if (payout === "at-maturity") {
    maturity = principal * Math.pow(1 + r, t);
  } else {
    maturity = principal * Math.pow(1 + r / n, n * t);
  }

  const interest = maturity - principal;

  const yearlyBreakdown = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    let amountAtYear: number;
    let prevAmount: number;

    if (payout === "at-maturity") {
      amountAtYear = principal * Math.pow(1 + r, year);
      prevAmount =
        year === 1 ? principal : principal * Math.pow(1 + r, year - 1);
    } else {
      amountAtYear = principal * Math.pow(1 + r / n, n * year);
      prevAmount =
        year === 1
          ? principal
          : principal * Math.pow(1 + r / n, n * (year - 1));
    }

    return { year, interest: amountAtYear - prevAmount };
  });

  return { maturity, interest, yearlyBreakdown };
};

export const getEffectiveAnnualRate = (
  annualRate: number,
  payout: PayoutFrequency
): number => {
  const n = getCompoundingPeriods(payout);
  const r = annualRate / 100;
  if (payout === "at-maturity") return annualRate;
  return (Math.pow(1 + r / n, n) - 1) * 100;
};
