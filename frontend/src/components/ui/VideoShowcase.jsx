import { motion } from 'framer-motion'

function VideoShowcase({ videos }) {
  const MotionArticle = motion.article

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {videos.map((video, index) => (
        <MotionArticle
          key={video.videoId}
          whileHover={{ y: -8, scale: 1.01 }}
          transition={{ duration: 0.22 }}
          className="startup-card group glass-panel overflow-hidden rounded-[1.75rem] border border-white/70 shadow-[0_20px_54px_rgba(15,23,42,0.08)]"
        >
          <div className="relative aspect-video overflow-hidden">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.4))] opacity-90 transition duration-300 group-hover:opacity-60" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/18 backdrop-blur-md shadow-[0_12px_34px_rgba(15,23,42,0.18)] transition duration-300 group-hover:scale-110">
                <span className="ml-1 inline-block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
              </div>
            </div>
            <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-slate-950/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              Featured #{index + 1}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              {video.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              {video.description}
            </p>
          </div>
        </MotionArticle>
      ))}
    </div>
  )
}

export default VideoShowcase
