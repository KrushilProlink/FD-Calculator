const CTACards = () => (
  <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2 sm:gap-5 sm:pt-2">
    <div className="relative overflow-visible rounded-xl bg-[#5F4B32] p-4 pb-4 pl-4 pr-4 pt-6 text-white sm:rounded-2xl sm:p-5 sm:pt-7">
      <span className="absolute left-4 top-0 z-10 -translate-y-1/2 rounded-md bg-[#f5a623] px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-md sm:left-5 sm:px-2.5 sm:py-1 sm:text-[11px]">
        Personalised
      </span>
      <p className="pr-10 text-sm font-semibold leading-snug sm:text-base lg:text-lg">
        Check Suitable Products For Your Investment
      </p>
      <p className="mt-1 text-xs text-white/65">Exclusively For You</p>
      <button
        type="button"
        aria-label="View products"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25 sm:right-4 sm:top-4 sm:h-9 sm:w-9"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M7 17L17 7M17 7H9M17 7V15" />
        </svg>
      </button>
    </div>
    <div className="relative overflow-hidden rounded-xl bg-[#4A4A4A] p-4 text-white sm:rounded-2xl sm:p-5">
      <p className="pr-10 text-sm font-semibold leading-snug sm:text-base lg:text-lg">
        Need Help Finding Right Product?
      </p>
      <p className="mt-1 text-xs text-white/65">
        Get Guidance From Wealth Manager
      </p>
      <button
        type="button"
        aria-label="Get guidance"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25 sm:right-4 sm:top-4 sm:h-9 sm:w-9"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M7 17L17 7M17 7H9M17 7V15" />
        </svg>
      </button>
    </div>
  </div>
);

export default CTACards;
