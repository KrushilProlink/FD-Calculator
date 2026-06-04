export const formatAxisValue = (value: number): string => {
  if (value >= 1e7) return `${(value / 1e7).toFixed(1)}Cr`;
  if (value >= 1e5) return `${(value / 1e5).toFixed(0)}L`;
  if (value >= 1000) return `${Math.round(value / 1000)}k`;
  return String(Math.round(value));
};

export const getNiceMaxY = (maxInterest: number): number => {
  if (maxInterest <= 15000) return 15000;
  const magnitude = Math.pow(10, Math.floor(Math.log10(maxInterest)));
  return Math.ceil(maxInterest / magnitude) * magnitude;
};

export const getXLabelStep = (totalYears: number): number => {
  if (totalYears <= 10) return 1;
  if (totalYears <= 20) return 2;
  if (totalYears <= 30) return 5;
  return 10;
};

export const shouldShowYearLabel = (
  year: number,
  totalYears: number,
  step: number
): boolean => year === 1 || year === totalYears || year % step === 0;

export const CHART_BAR_AREA_HEIGHT = 180;
export const CHART_SCROLL_THRESHOLD = 12;
export const BAR_WIDTH_COMPACT = 8;
export const BAR_WIDTH_NORMAL = 22;

/** Rounded px height — avoids SSR/client hydration float mismatch */
export const getBarHeightPx = (interest: number, maxY: number): number =>
  Math.round(Math.max(4, (interest / maxY) * CHART_BAR_AREA_HEIGHT));
