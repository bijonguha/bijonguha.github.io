import { useState } from 'react';
import { Film, Play } from 'lucide-react';
import { MediaViewer } from '@/components/ProjectMedia';
import { isMoving, stillOf } from '@/lib/media';
import type { ProjectMediaItem } from '@/config/bijonConfig';

const toItem = (src: string): ProjectMediaItem => {
  const path = src.split('?')[0].toLowerCase();
  if (/\.(mp4|webm|mov)$/.test(path)) return { type: 'video', src };
  if (path.endsWith('.gif')) return { type: 'gif', src };
  return { type: 'image', src };
};

/**
 * Grid of a post's extra images, GIFs and videos (the `gallery:` list in its
 * front matter). Clicking one opens the pop-up viewer, with previous/next.
 */
const PostGallery = ({ title, sources }: { title: string; sources: string[] }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  if (sources.length === 0) return null;

  const items = sources.map(toItem);

  return (
    <section aria-label="Gallery" className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, i) => {
          // GIFs show as their animated self here; videos show an icon unless a poster exists.
          const still = item.type === 'video' ? stillOf(item) : item.src;
          return (
            <button
              key={`${item.src}-${i}`}
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="group relative aspect-video overflow-hidden rounded-lg border bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Open item ${i + 1} of ${items.length}`}
            >
              {still ? (
                <img src={still} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
              ) : (
                <Film className="absolute inset-0 m-auto w-7 h-7 text-muted-foreground" aria-hidden="true" />
              )}
              {isMoving(item) && item.type === 'video' && (
                <span className="absolute inset-0 m-auto flex items-center justify-center w-11 h-11 rounded-full bg-background/90 shadow">
                  <Play className="w-5 h-5 ml-0.5" fill="currentColor" aria-hidden="true" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <MediaViewer name={title} items={items} index={index} onIndexChange={setIndex} open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default PostGallery;
