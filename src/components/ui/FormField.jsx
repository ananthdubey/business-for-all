import { cn } from '../../utils/cn'

function FormField({
  as = 'input',
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  placeholder,
  error,
  rows,
}) {
  const Component = as

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor={id}>
        {label}
      </label>
      <Component
        id={id}
        name={name}
        type={as === 'input' ? type : undefined}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'glass-panel w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-4',
          error
            ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
            : 'border-blue-100 focus:border-blue-500 focus:ring-blue-100'
        )}
      />
      {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
    </div>
  )
}

export default FormField
