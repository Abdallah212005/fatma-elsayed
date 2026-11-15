import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ArchiveEntry, PortfolioWork } from '@/src/data/portfolio';
import { cn } from '@/src/lib/utils';

interface ArchiveIndexProps {
  entries: ArchiveEntry[];
  works: PortfolioWork[];
  onSelectWork: (work: PortfolioWork) => void;
}

export const ArchiveIndex: React.FC<ArchiveIndexProps> = ({
  entries,
  works,
  onSelectWork,
}) => {
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

  const handleRowClick = (entry: ArchiveEntry) => {
    if (entry.workId) {
      const matched = works.find((w) => w.id === entry.workId);
      if (matched) {
        onSelectWork(matched);
        return;
      }
    }
    setExpandedTitle((prev) => (prev === entry.title ? null : entry.title));
  };

  return (
    <section
      id="archive"
      className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:px-12 md:py-24"
    >
      <div className="flex flex-col justify-between gap-4 pb-8 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-medium tracking-wide text-foreground/60">
            Exhibitions &amp; Print Index
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Selected monographs and shows.
          </h2>
        </div>
        <p className="text-xs text-foreground/60">
          Select any entry to inspect frames or edition notes.
        </p>
      </div>

      <div className="divide-y divide-border border-y border-border">
        {entries.map((entry) => {
          const hasWork = Boolean(entry.workId);
          const isExpanded = expandedTitle === entry.title;

          return (
            <div key={entry.title} className="transition-colors hover:bg-surface/70">
              <button
                type="button"
                onClick={() => handleRowClick(entry)}
                aria-expanded={hasWork ? undefined : isExpanded}
                className="grid w-full grid-cols-12 items-center gap-3 px-2 py-4 text-left sm:px-4"
              >
                <span className="col-span-2 font-mono text-xs tabular-nums text-foreground/60 sm:col-span-1">
                  {entry.year}
                </span>
                <span className="col-span-10 font-display text-base font-semibold tracking-tight text-foreground sm:col-span-4 sm:text-lg">
                  {entry.title}
                </span>
                <span className="col-span-6 text-xs text-foreground/70 sm:col-span-3 sm:text-sm">
                  {entry.format}
                </span>
                <span className="col-span-4 text-xs text-foreground/60 sm:col-span-3 sm:text-sm">
                  {entry.venueOrPublisher} · {entry.city}
                </span>
                <span className="col-span-2 flex items-center justify-end gap-1.5 font-mono text-xs tabular-nums text-foreground/75 sm:col-span-1">
                  <span className={cn(hasWork && 'underline decoration-[#F2B705] decoration-2 underline-offset-4')}>
                    {entry.edition}
                  </span>
                  {hasWork && <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
                </span>
              </button>

              {!hasWork && isExpanded && (
                <div className="px-2 pb-4 pt-1 text-sm text-foreground/70 sm:px-4">
                  Archival edition published in {entry.city} by {entry.venueOrPublisher}. Reference copies are available for studio review upon request.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
