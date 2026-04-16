function LoadingScreen() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-4">
      <div className="glass-panel section-sheen relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/70 p-8 shadow-[0_24px_72px_rgba(15,23,42,0.1)] sm:p-10">
        <div className="floating-orb absolute -left-6 top-4 h-24 w-24 rounded-full bg-blue-300/20 blur-3xl" />
        <div className="float-slow absolute -right-8 bottom-0 h-28 w-28 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-700">
            Loading Experience
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Preparing your premium franchise presentation
          </h2>
          <div className="mt-8 space-y-4">
            <div className="loading-shimmer h-4 w-40 rounded-full" />
            <div className="loading-shimmer h-4 w-full rounded-full" />
            <div className="loading-shimmer h-4 w-5/6 rounded-full" />
            <div className="loading-shimmer h-40 w-full rounded-[1.5rem]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
