import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PortfolioWork } from '@/src/data/portfolio';
import { ResilientImage } from '@/src/components/ResilientImage';

interface LightboxModalProps {
  work: PortfolioWork | null;
  works: PortfolioWork[];
  onClose: () => void;
  onNavigate: (work: PortfolioWork) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  work,
  works,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    if (!work) return;

    const currentIndex = works.findIndex((item) => item.id === work.id);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && works.length > 1) {
        const next = works[(currentIndex + 1) % works.length];
        onNavigate(next);
      } else if (event.key === 'ArrowLeft' && works.length > 1) {
        const prev = works[(currentIndex - 1 + works.length) % works.length];
        onNavigate(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [work, works, onClose, onNavigate]);

  if (!work) return null;

  const currentIndex = works.findIndex((item) => item.id === work.id);
  const prevWork = works[(currentIndex - 1 + works.length) % works.length];
  const nextWork = works[(currentIndex + 1) % works.length];

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090B]/92 p-4 backdrop-blur-sm sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lightbox-title"
      >
        <motion.div
          key={work.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111114] text-white"
        >
          {/* Top Controls */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/65">
              <span>{work.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{work.year}</span>
              <span aria-hidden="true">·</span>
              <span>{work.client}</span>
            </div>

            <div className="flex items-center gap-2">
              {works.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => onNavigate(prevWork)}
                    aria-label="Previous project"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(nextWork)}
                    aria-label="Next project"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close lightbox"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0E0E10] transition-colors hover:bg-[#F2B705]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Media Viewport */}
          <div className="flex-1 overflow-y-auto">
            <div className="relative max-h-[58vh] w-full overflow-hidden bg-black">
              <ResilientImage
                src={work.imageSrc}
                alt={work.imageAlt}
                fallbackTitle={work.title}
                className="mx-auto max-h-[58vh] w-full object-contain"
              />
            </div>

            {/* Editorial Details & EXIF */}
            <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-12">
              <div className="md:col-span-7">
                <h3 id="lightbox-title" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {work.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-[15px]">
                  {work.summary}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-4 text-xs md:col-span-5 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <div>
                  <p className="text-white/50">Technical Capture</p>
                  <p className="mt-1 font-mono tabular-nums text-white/90">{work.exif}</p>
                </div>
                <div>
                  <p className="text-white/50">Location &amp; Credits</p>
                  <p className="mt-1 text-white/85">{work.location}</p>
                  <p className="mt-1 text-white/65">{work.credits}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
