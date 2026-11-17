import React from 'react';
import { ArchiveEntry, PortfolioWork } from '@/src/data/portfolio';

interface ArchiveIndexProps {
  entries: ArchiveEntry[];
  works: PortfolioWork[];
  onSelectWork: (work: PortfolioWork) => void;
}

export const ArchiveIndex: React.FC<ArchiveIndexProps> = ({
  entries,
  works,
  onSelectWork,
}) => (
  <section
    id="archive"
    aria-label="Archive"
    className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:px-12 md:py-24"
  >
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => {
        const work = works.find((item) => item.id === entry.workId);
        if (!work) return null;

        return (
          <button
            key={entry.title}
            type="button"
            onClick={() => onSelectWork(work)}
            aria-label={`Open ${work.title} from the archive`}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface focus-visible:outline-offset-4"
          >
            <img
              src={work.imageSrc}
              alt={work.imageAlt}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
            />
          </button>
        );
      })}
    </div>
  </section>
);
