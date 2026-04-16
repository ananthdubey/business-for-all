import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { apiRequest } from '../utils/api'

const quickReplies = [
  'How to apply?',
  'Investment plans?',
  'Contact support?',
  'Franchise types?',
]

const fallbackReplies = {
  'How to apply?':
    'Applying is simple: explore the franchise categories, choose the model that fits your goals, and submit your details through the Apply Now form.',
  'Investment plans?':
    'Investment depends on the franchise category and support level you choose. Open the Plans page or contact support for a tailored recommendation.',
  'Contact support?':
    'You can reach support through the Contact page, email hello@businessforall.com, or call +91 98765 43210.',
  'Franchise types?':
    'We offer franchise opportunities across food, service, retail, and other business-ready categories. Explore Categories to find the right fit.',
}

const createMessage = (role, content, extra = {}) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
  ...extra,
})

function ChatWidget() {
  const MotionButton = motion.button
  const MotionDiv = motion.div
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState(() => [
    createMessage(
      'assistant',
      'Welcome to Business for All. Ask about applying, investment plans, support, or franchise types.',
      { quickReplies }
    ),
  ])
  const viewportRef = useRef(null)
  const apiBaseUrl = useMemo(() => import.meta.env.VITE_API_BASE_URL || '', [])

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight
    }
  }, [messages, isOpen])

  const requestReply = async (question) => {
    setMessages((current) => [...current, createMessage('user', question)])
    setIsLoading(true)

    try {
      const response = await apiRequest(`${apiBaseUrl}/api/support/chat`, {
        method: 'POST',
        body: JSON.stringify({ message: question }),
      })
      const reply = response?.data?.reply || fallbackReplies[question] || fallbackReplies['How to apply?']
      const nextQuickReplies = response?.data?.quickReplies || quickReplies

      setMessages((current) => [
        ...current,
        createMessage('assistant', reply, { quickReplies: nextQuickReplies }),
      ])
    } catch {
      setMessages((current) => [
        ...current,
        createMessage(
          'assistant',
          fallbackReplies[question] ||
            'I am having trouble reaching support right now, but you can still use the Contact page for direct help.',
          { quickReplies }
        ),
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (question) => {
    if (isLoading) {
      return
    }

    requestReply(question)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const question = inputValue.trim()
    if (!question || isLoading) {
      return
    }

    setInputValue('')
    requestReply(question)
  }

  return (
    <div className="fixed bottom-5 right-4 z-50 md:bottom-8 md:right-8">
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-[1.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(238,242,255,0.92))] shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl"
          >
            <div className="relative overflow-hidden border-b border-blue-100 bg-[linear-gradient(135deg,#eef4ff_0%,#ffffff_100%)] px-5 py-4 text-slate-900">
              <div className="pulse-glow absolute right-4 top-2 h-14 w-14 rounded-full bg-cyan-200/30 blur-2xl" />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
                    Chat Support
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Quick answers for franchise buyers and investors
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="startup-button inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-white text-lg text-slate-700"
                  aria-label="Close chatbot"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M5 5l10 10M15 5 5 15"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div ref={viewportRef} className="max-h-[24rem] space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[1.25rem] px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === 'assistant'
                        ? 'border border-white/80 bg-white text-slate-700'
                        : 'bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white'
                    }`}
                  >
                    {message.content}
                    {message.role === 'assistant' && message.quickReplies?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.quickReplies.map((reply) => (
                          <button
                            key={reply}
                            type="button"
                            onClick={() => handleQuickReply(reply)}
                            className="startup-button rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 hover:bg-blue-100"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="rounded-[1.25rem] border border-white/80 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-300 animate-bounce" />
                      <span className="h-2 w-2 rounded-full bg-blue-400 animate-bounce [animation-delay:120ms]" />
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:240ms]" />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-blue-100 px-4 py-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Ask a question..."
                  className="glass-panel w-full rounded-full border border-blue-100 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                <MotionButton
                  type="submit"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="startup-button inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-[0_14px_32px_rgba(37,99,235,0.22)]"
                  aria-label="Send message"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
                    <path
                      d="M10 15V5m0 0L6.5 8.5M10 5l3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </MotionButton>
              </div>
            </form>
          </MotionDiv>
        )}
      </AnimatePresence>

      <MotionButton
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        whileHover={{ y: -3, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="startup-button inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white shadow-[0_20px_40px_rgba(37,99,235,0.24)]"
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        {isOpen ? (
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
              d="M5 5l10 10M15 5 5 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
            <path
              d="M7 9.5h10M7 13h7m-2 8-4.2-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-1.8L12 21Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </MotionButton>
    </div>
  )
}

export default ChatWidget
