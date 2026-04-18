import { useCallback, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import ToastContext from './toast-context'

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const TONES = {
  success: 'border-emerald-300/30 bg-emerald-400/10 text-emerald-200',
  error: 'border-rose-300/30 bg-rose-400/10 text-rose-200',
  info: 'border-cyan-300/30 bg-cyan-400/10 text-cyan-100',
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timeoutMap = useRef(new Map())

  const dismissToast = useCallback((id) => {
    const existingTimeout = timeoutMap.current.get(id)
    if (existingTimeout) {
      window.clearTimeout(existingTimeout)
      timeoutMap.current.delete(id)
    }

    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    ({ title, description = '', tone = 'info', duration = 3800 }) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const nextToast = { id, title, description, tone }

      setToasts((current) => [...current, nextToast])

      const timeoutId = window.setTimeout(() => {
        dismissToast(id)
      }, duration)

      timeoutMap.current.set(id, timeoutId)
    },
    [dismissToast]
  )

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [dismissToast, showToast]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-4 top-4 z-[100] flex flex-col gap-3 sm:left-auto sm:right-6 sm:top-6 sm:w-full sm:max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = ICONS[toast.tone] || ICONS.info

            return (
              <Motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className={`pointer-events-auto rounded-[1.4rem] border px-4 py-4 shadow-[0_18px_48px_rgba(15,23,42,0.18)] backdrop-blur-xl ${TONES[toast.tone] || TONES.info}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{toast.title}</p>
                    {toast.description ? <p className="mt-1 text-sm opacity-90">{toast.description}</p> : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismissToast(toast.id)}
                    className="startup-button inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/8"
                    aria-label="Dismiss notification"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </Motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export { ToastProvider }
