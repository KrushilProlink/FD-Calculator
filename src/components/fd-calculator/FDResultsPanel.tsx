import { PANEL_TAN } from "@/lib/fd/constants";
import type { FDResults } from "@/lib/fd/types";
import BarChart from "./BarChart";
import CTACards from "./CTACards";
import ResultsSummary from "./ResultsSummary";

type FDResultsPanelProps = {
  results: FDResults;
  selectedYear: number;
};

const FDResultsPanel = ({ results, selectedYear }: FDResultsPanelProps) => (
  <div
    className="flex flex-col gap-5 p-5 sm:gap-6 sm:p-8 lg:min-h-full lg:justify-between lg:p-11"
    style={{ backgroundColor: PANEL_TAN }}
  >
    <ResultsSummary
      maturity={results.maturity}
      interest={results.interest}
    />

    <div className="rounded-xl bg-white p-3 shadow-sm sm:rounded-2xl sm:p-5">
      <BarChart data={results.yearlyBreakdown} selectedYear={selectedYear} />
    </div>

    <CTACards />
  </div>
);

export default FDResultsPanel;
