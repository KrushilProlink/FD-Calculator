import { formatINR } from "@/lib/fd/formatters";

type ResultsSummaryProps = {
  maturity: number;
  interest: number;
};

const ResultsSummary = ({ maturity, interest }: ResultsSummaryProps) => (
  <div className="grid grid-cols-2 gap-3 sm:gap-6">
    <div className="min-w-0">
      <p className="text-xs font-medium text-white/85 sm:text-sm">
        Maturity Amount
      </p>
      <p className="mt-1 break-words text-lg font-bold leading-tight tracking-tight text-white sm:text-2xl lg:text-3xl">
        {formatINR(maturity)}
      </p>
    </div>
    <div className="min-w-0">
      <p className="text-xs font-medium text-white/85 sm:text-sm">
        Interest Earned
      </p>
      <p className="mt-1 break-words text-lg font-bold leading-tight tracking-tight text-white sm:text-2xl lg:text-3xl">
        {formatINR(interest)}
      </p>
    </div>
  </div>
);

export default ResultsSummary;
