function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-500">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold leading-[1.06] theme-text-primary sm:text-4xl lg:text-[2.9rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 theme-text-secondary sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeading
