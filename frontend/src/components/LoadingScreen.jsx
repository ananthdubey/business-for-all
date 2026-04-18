function LoadingScreen() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-6xl items-center justify-center px-4">
      <div className="hero-shell animated-border w-full max-w-4xl rounded-[2.2rem] px-8 py-10 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-500">
              Loading Experience
            </p>
            <h2 className="mt-4 text-3xl font-bold theme-text-primary sm:text-4xl">
              Preparing your premium startup presentation
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 theme-text-secondary">
              We are assembling the next part of the product so the experience stays smooth, polished, and high trust.
            </p>
            <div className="mt-8 space-y-4">
              <div className="loading-shimmer h-4 w-40 rounded-full" />
              <div className="loading-shimmer h-4 w-full rounded-full" />
              <div className="loading-shimmer h-4 w-5/6 rounded-full" />
            </div>
          </div>

          <div className="surface-panel rounded-[1.8rem] p-5">
            <div className="loading-shimmer h-10 w-36 rounded-full" />
            <div className="loading-shimmer mt-5 h-44 w-full rounded-[1.5rem]" />
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="loading-shimmer h-20 rounded-[1.2rem]" />
              <div className="loading-shimmer h-20 rounded-[1.2rem]" />
              <div className="loading-shimmer h-20 rounded-[1.2rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
