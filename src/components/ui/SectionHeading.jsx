function SectionHeading({ eyebrow, title, description, dark = false }) {
  return (
    <div className="max-w-3xl">
      <p
        className={`text-sm font-semibold uppercase tracking-[0.22em] ${
          dark ? 'text-cyan-600' : 'text-blue-700'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[2.95rem] ${
          dark ? 'text-slate-900' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 max-w-2xl text-[1.02rem] leading-8 sm:text-[1.08rem] ${dark ? 'text-slate-700' : 'text-slate-700'}`}>
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
