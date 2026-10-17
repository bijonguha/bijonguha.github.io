import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Film, ImageIcon, Maximize2, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import type { ProjectMediaItem } from '@/config/bijonConfig';
import { isMoving, stillOf } from '@/lib/media';

const frame = 'relative w-full aspect-video overflow-hidden rounded-lg border bg-muted';

/* ------------------------------------------------------------------ */
/* Pop-up player: one item at a time, with previous/next for a gallery */
/* ------------------------------------------------------------------ */

export const MediaViewer = ({
  name,
  items,
  index,
  onIndexChange,
  open,
  onOpenChange,
}: {
  name: string;
  items: ProjectMediaItem[];
  index: number;
  onIndexChange: (i: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const count = items.length;
  const item = items[index];
  const go = useCallback(
    (step: number) => onIndexChange((index + step + count) % count),
    [index, count, onIndexChange]
  );

  useEffect(() => {
    if (!open || count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, count, go]);

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-3 sm:p-4 gap-3">
        <DialogTitle className="text-base pr-8">
          {name}
          {count > 1 && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {index + 1} / {count}
            </span>
          )}
        </DialogTitle>
        <DialogDescription className="sr-only">{item.caption || `${name} media`}</DialogDescription>

        <div className="relative w-full overflow-hidden rounded-md bg-black">
          {item.type === 'video' ? (
            <video
              key={item.src}
              className="w-full max-h-[70vh]"
              src={item.src}
              poster={item.poster || undefined}
              aria-label={item.caption || `${name} demo video`}
              controls
              autoPlay
              playsInline
            />
          ) : (
            <img
              key={item.src}
              src={item.src}
              alt={item.caption || `${name} ${item.type === 'gif' ? 'demo' : 'screenshot'}`}
              className="w-full max-h-[70vh] object-contain"
            />
          )}

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-background/80 text-foreground shadow hover:bg-background"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-background/80 text-foreground shadow hover:bg-background"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {item.caption && <p className="text-sm text-muted-foreground">{item.caption}</p>}

        {count > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Choose media">
            {items.map((it, i) => {
              const still = stillOf(it);
              return (
                <button
                  key={`${it.src}-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show item ${i + 1}${it.caption ? `: ${it.caption}` : ''}`}
                  onClick={() => onIndexChange(i)}
                  className={`relative flex-none w-24 aspect-video overflow-hidden rounded border-2 bg-muted ${
                    i === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  {still ? (
                    <img src={still} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <Film className="absolute inset-0 m-auto w-5 h-5 text-muted-foreground" />
                  )}
                  {isMoving(it) && (
                    <Play className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow" fill="currentColor" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

/* ------------------------------------------------------------------ */
/* Card thumbnail: a still image; clicking opens the pop-up player     */
/* ------------------------------------------------------------------ */

export const ProjectThumbnail = ({
  name,
  thumbnail,
  media,
}: {
  name: string;
  /** Card image. Falls back to the first media item's poster or image. */
  thumbnail?: string;
  media?: ProjectMediaItem[];
}) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // What the viewer shows: the media list, or just the thumbnail enlarged.
  const items: ProjectMediaItem[] =
    media && media.length > 0
      ? media
      : thumbnail
        ? [{ type: 'image', src: thumbnail, caption: name }]
        : [];

  const cover = thumbnail || items.map(stillOf).find(Boolean) || '';
  const first = items[0];
  const moving = items.some(isMoving);

  if (items.length === 0) {
    return (
      <div
        className={`${frame} border-dashed flex flex-col items-center justify-center gap-2 text-muted-foreground`}
        role="img"
        aria-label={`${name} preview coming soon`}
      >
        <ImageIcon className="w-7 h-7" aria-hidden="true" />
        <span className="text-xs font-medium">Preview coming soon</span>
      </div>
    );
  }

  const label = moving ? `Play ${name} demo` : `View ${name} screenshots`;
  const badge =
    items.length > 1
      ? `${items.length} items`
      : first?.type === 'video'
        ? 'Video'
        : first?.type === 'gif'
          ? 'GIF'
          : '';

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        className={`${frame} group/media block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
        aria-label={label}
      >
        {cover ? (
          <img
            src={cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover/media:scale-[1.03]"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <Film className="w-8 h-8" aria-hidden="true" />
          </span>
        )}
        <span className="absolute inset-0 bg-black/0 group-hover/media:bg-black/20 transition-colors" />
        <span className="absolute inset-0 flex items-center justify-center">
          {moving ? (
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-background/90 text-foreground shadow-lg transition-transform group-hover/media:scale-110">
              <Play className="w-6 h-6 ml-0.5" fill="currentColor" aria-hidden="true" />
            </span>
          ) : (
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-background/90 text-foreground shadow opacity-0 group-hover/media:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" aria-hidden="true" />
            </span>
          )}
        </span>
        {badge && (
          <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white">
            {badge}
          </span>
        )}
      </button>

      <MediaViewer
        name={name}
        items={items}
        index={index}
        onIndexChange={setIndex}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default ProjectThumbnail;
