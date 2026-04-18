import { AlertCircle } from 'lucide-react'
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
  hint,
  required = false,
}) {
  const Component = as

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold theme-text-primary" htmlFor={id}>
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
        required={required}
        className={cn(
          'form-field w-full rounded-[1.25rem] px-4 py-3 text-sm outline-none transition focus:border-[rgba(108,92,231,0.5)] focus:ring-4 focus:ring-[rgba(108,92,231,0.14)]',
          error ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-100' : ''
        )}
      />
      {hint && !error ? <p className="mt-2 text-xs theme-text-tertiary">{hint}</p> : null}
      {error ? (
        <p className="mt-2 inline-flex items-center gap-2 text-sm text-rose-500">
          <AlertCircle className="h-4 w-4" />
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default FormField
