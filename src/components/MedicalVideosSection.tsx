import React from 'react';
import { motion } from 'motion/react';

const MEDICAL_VIDEOS = [
  {
    title: 'Dental Clinic Campaign',
    src: '/videos/dental-clinic.mp4',
    poster: '/videos/dental-clinic.jpg',
  },
  {
    title: 'Dental Clinic Reel',
    src: '/videos/dental-reel.mp4',
    poster: '/videos/dental-reel.jpg',
  },
  {
    title: 'Clinic Review',
    src: '/videos/medical-video-06.mp4',
    poster: '/videos/medical-video-06.jpg',
  },
  {
    title: 'Dental Care',
    src: '/videos/medical-video-07.mp4',
    poster: '/videos/medical-video-07.jpg',
  },
  {
    title: 'Thyroid Awareness',
    src: '/videos/medical-video-08.mp4',
    poster: '/videos/medical-video-08.jpg',
  },
  {
    title: 'Dental Alignment',
    src: '/videos/medical-video-09.mp4',
    poster: '/videos/medical-video-09.jpg',
  },
];

export const MedicalVideosSection: React.FC = () => (
  <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:px-12 md:py-28">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end"
    >
      <div>
        <p className="text-xs font-medium tracking-wide text-foreground/60">
          Healthcare Marketing · Video Portfolio
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
          Medical Content &amp; Campaigns
        </h2>
      </div>
    </motion.div>

    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {MEDICAL_VIDEOS.map((video, index) => (
        <motion.article
          key={video.src}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.55,
            delay: Math.min(index * 0.06, 0.24),
            ease: [0.22, 1, 0.36, 1],
          }}
          className="overflow-hidden rounded-2xl border border-border bg-background"
        >
          <video
            src={video.src}
            poster={video.poster}
            controls
            playsInline
            preload="none"
            aria-label={`${video.title} medical video`}
            className="aspect-[9/16] max-h-[560px] w-full bg-black object-contain"
          />
          <div className="border-t border-border p-5">
            <p className="text-xs font-medium tracking-wide text-foreground/55">
              Medical Video · {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-foreground">
              {video.title}
            </h3>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);
