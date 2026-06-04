"use client";

import {
  BAR_WIDTH_COMPACT,
  BAR_WIDTH_NORMAL,
  CHART_SCROLL_THRESHOLD,
  formatAxisValue,
  getNiceMaxY,
  getXLabelStep,
  shouldShowYearLabel,
} from "@/lib/fd/chart-utils";
import { formatINR } from "@/lib/fd/formatters";
import type { YearlyBreakdown } from "@/lib/fd/types";

const CHART_HEIGHT_CLASS = "h-[130px] sm:h-[160px] lg:h-[180px]";

type BarChartProps = {
  data: YearlyBreakdown[];
  selectedYear: number;
};

const BarChart = ({ data, selectedYear }: BarChartProps) => {
  if (data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-[#888]">
        Adjust time period to see yearly interest breakdown
      </p>
    );
  }

  const totalYears = data.length;
  const isCompact = totalYears > CHART_SCROLL_THRESHOLD;
  const barWidth = isCompact ? BAR_WIDTH_COMPACT : BAR_WIDTH_NORMAL;
  const labelStep = getXLabelStep(totalYears);
  const scrollWidth = totalYears * (barWidth + 2) + 8;

  const maxInterest = Math.max(...data.map((d) => d.interest), 1);
  const maxY = getNiceMaxY(maxInterest);
  const yTicks = [maxY, maxY * 0.75, maxY * 0.5, maxY * 0.25, 0];

  const getBarHeightPercent = (interest: number) =>
    Math.max(4, Math.round((interest / maxY) * 100));

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex flex-col gap-2 text-[10px] text-[#4a4a4a] sm:mb-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:text-xs">
        <div className="flex flex-wrap items-center gap-3 sm:gap-6">
          <span className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#5F4B32] sm:h-3 sm:w-3" />
            Selected Year
          </span>
          <span className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#B99470]/50 sm:h-3 sm:w-3" />
            Other Years
          </span>
        </div>
        {isCompact && (
          <span className="text-[10px] text-[#999]">
            Scroll chart to see all {totalYears} years
          </span>
        )}
      </div>
      <div className="flex gap-1.5 sm:gap-2">
        <div
          className={`flex w-9 shrink-0 flex-col justify-between text-[9px] leading-none text-[#888] sm:w-12 sm:text-[10px] ${CHART_HEIGHT_CLASS}`}
        >
          {yTicks.map((tick) => (
            <span key={tick} className="truncate">
              {formatAxisValue(tick)}
            </span>
          ))}
        </div>
        <div className="min-w-0 flex-1 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
          <div
            className="inline-block min-w-full"
            style={{ minWidth: isCompact ? scrollWidth : undefined }}
          >
            <div
              className={`flex items-end gap-[2px] border-b border-l border-[#e0e0e0] pl-1 ${CHART_HEIGHT_CLASS} ${
                isCompact ? "" : "w-full"
              }`}
              style={isCompact ? { width: scrollWidth } : undefined}
            >
              {data.map((item) => {
                const isSelected = item.year === selectedYear;
                const heightPct = getBarHeightPercent(item.interest);

                return (
                  <div
                    key={item.year}
                    className={`flex h-full flex-col items-center justify-end ${
                      isCompact ? "shrink-0" : "min-w-0 flex-1"
                    }`}
                    style={isCompact ? { width: barWidth } : undefined}
                    title={`Year ${item.year}: ${formatINR(item.interest)}`}
                  >
                    <div
                      className={`w-full max-w-6 rounded-t-sm transition-all duration-300 sm:max-w-7 ${
                        isSelected ? "bg-[#5F4B32]" : "bg-[#B99470]"
                      } ${!isCompact ? "mx-auto max-w-8 sm:max-w-10" : ""}`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div
              className="mt-1.5 flex gap-[2px] pl-1"
              style={{ width: isCompact ? scrollWidth : "100%" }}
            >
              {data.map((item) => (
                <div
                  key={item.year}
                  className={`text-center ${
                    isCompact ? "shrink-0" : "min-w-0 flex-1"
                  }`}
                  style={isCompact ? { width: barWidth } : undefined}
                >
                  {(isCompact
                    ? shouldShowYearLabel(item.year, totalYears, labelStep)
                    : true) && (
                    <span className="block text-[8px] leading-none text-[#666] sm:text-[10px]">
                      {item.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
