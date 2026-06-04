export type PayoutFrequency =
  | "quarterly"
  | "half-yearly"
  | "yearly"
  | "at-maturity";

export type YearlyBreakdown = {
  year: number;
  interest: number;
};

export type FDResults = {
  maturity: number;
  interest: number;
  yearlyBreakdown: YearlyBreakdown[];
};
