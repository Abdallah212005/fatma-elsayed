import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import GlassFolder, { FolderFile } from '@/src/components/ui/glass-folder-cards';

const photoAssets = import.meta.glob<string>('/photos/*/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
});

const photoFoldersByName: Record<string, FolderFile[]> = {};

for (const [path, image] of Object.entries(photoAssets)) {
  const match = path.match(/^\/photos\/(.+)\/([^/]+)\.png$/);
  if (!match) continue;

  const [, folderName, fileName] = match;
  photoFoldersByName[folderName] ??= [];
  photoFoldersByName[folderName].push({
    name: fileName,
    meta: 'PNG image',
    image,
  });
}

const photoFolders = Object.entries(photoFoldersByName)
  .map(([label, files]) => ({
    label,
    files: files.sort((left, right) => Number(left.name) - Number(right.name)),
  }))
  .sort((left, right) => left.label.localeCompare(right.label, 'ar'));

const featuredMockupLabels = new Set(['الموك اب', 'موك اب 2']);
const featuredMockupFolders = photoFolders.filter((folder) =>
  featuredMockupLabels.has(folder.label),
);
const regularPhotoFolders = photoFolders.filter(
  (folder) => !featuredMockupLabels.has(folder.label),
);

interface SelectedPhoto {
  folderName: string;
  files: FolderFile[];
  index: number;
}

function getAdjacentPhoto(
  selection: SelectedPhoto | null,
  direction: -1 | 1,
): SelectedPhoto | null {
  if (!selection || selection.files.length < 2) return selection;

  return {
    ...selection,
    index:
      (selection.index + direction + selection.files.length) %
      selection.files.length,
  };
}

export function PhotographySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto | null>(null);
  const activeFile = selectedPhoto?.files[selectedPhoto.index];

  useEffect(() => {
    if (!selectedPhoto) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setSelectedPhoto((selection) => getAdjacentPhoto(selection, -1));
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setSelectedPhoto((selection) => getAdjacentPhoto(selection, 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <>
      <section
        id="photography"
        className="border-t border-border px-6 py-20 sm:px-10 md:px-12 md:py-28"
        aria-labelledby="photography-heading"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium tracking-wide text-foreground/60">
                Photography &amp; Design · Visual Archive
              </p>
              <h2
                id="photography-heading"
                className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
              >
                Selected Image Collections
              </h2>
            </div>
            <p className="text-xs text-foreground/60">
              Open a folder to explore its images.
            </p>
          </div>

          {featuredMockupFolders.length > 0 && (
            <section className="mt-12" aria-labelledby="mockup-heading">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-medium tracking-wide text-foreground/60">
                    Featured Work
                  </p>
                  <h3
                    id="mockup-heading"
                    className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground"
                  >
                    Mockup Highlights
                  </h3>
                </div>
                <p className="text-xs text-foreground/60">
                  Select an image to explore the full set.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {featuredMockupFolders.map((folder) => (
                  <article
                    key={folder.label}
                    className="rounded-2xl border border-border bg-surface/40 p-3 sm:p-4"
                  >
                    <div className="mb-3 flex items-center justify-between px-1">
                      <h4 className="font-display text-base font-semibold text-foreground">
                        {folder.label}
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {folder.files.map((file, imageIndex) => (
                        <button
                          key={file.name}
                          type="button"
                          onClick={() =>
                            setSelectedPhoto({
                              folderName: folder.label,
                              files: folder.files,
                              index: imageIndex,
                            })
                          }
                          aria-label={`View mockup ${file.name} from ${folder.label}`}
                          className={`group relative overflow-hidden rounded-xl border border-border bg-[#141416] ${
                            folder.files.length === 3 && imageIndex === 0
                              ? 'col-span-2 aspect-[16/9]'
                              : 'aspect-[4/3]'
                          }`}
                        >
                          <img
                            src={file.image}
                            alt={`${folder.label} mockup ${file.name}`}
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                          />
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 grid grid-cols-1 justify-items-center gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {regularPhotoFolders.map((folder, index) => (
              <GlassFolder
                key={folder.label}
                label={folder.label}
                meta={`${folder.files.length} images`}
                image={folder.files[0]?.image}
                files={folder.files}
                action="none"
                width={300}
                appearDelay={index * 80}
                onFileSelect={(_, imageIndex) =>
                  setSelectedPhoto({
                    folderName: folder.label,
                    files: folder.files,
                    index: imageIndex,
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {selectedPhoto && activeFile?.image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setSelectedPhoto(null)}
          role="presentation"
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111114] text-white"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedPhoto.folderName}: ${activeFile.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs text-white/55">{selectedPhoto.folderName}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">
                  {activeFile.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close image"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0E0E10] transition-colors hover:bg-[#F2B705]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black p-3 sm:p-6">
              <img
                src={activeFile.image}
                alt={`${selectedPhoto.folderName} — ${activeFile.name}`}
                className="max-h-[72vh] max-w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
              <button
                type="button"
                onClick={() =>
                  setSelectedPhoto((selection) =>
                    getAdjacentPhoto(selection, -1),
                  )
                }
                disabled={selectedPhoto.files.length < 2}
                aria-label="Previous image"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/85 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              <span className="font-mono text-xs tabular-nums text-white/60">
                {selectedPhoto.index + 1} / {selectedPhoto.files.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setSelectedPhoto((selection) =>
                    getAdjacentPhoto(selection, 1),
                  )
                }
                disabled={selectedPhoto.files.length < 2}
                aria-label="Next image"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/85 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
