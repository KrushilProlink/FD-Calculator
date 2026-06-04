export const formatINR = (value: number): string =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(value));

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const formatWithCommas = (n: number) =>
  Math.round(n).toLocaleString("en-IN");

export const formatRangeDeposit = (v: number) =>
  v >= 100000 ? `₹${v / 100000}L` : `₹${(v / 1000).toFixed(0)}K`;
