import type { PayoutFrequency } from "./types";

export const PRIMARY_TAN = "#B99470";
export const PANEL_TAN = "#B99470";

export const PAYOUT_OPTIONS: { id: PayoutFrequency; label: string }[] = [
  { id: "quarterly", label: "Quarterly" },
  { id: "half-yearly", label: "Half yearly" },
  { id: "yearly", label: "Yearly" },
  { id: "at-maturity", label: "At Maturity" },
];

export const FREQUENCY_MAP: Record<PayoutFrequency, number> = {
  quarterly: 4,
  "half-yearly": 2,
  yearly: 1,
  "at-maturity": 1,
};
