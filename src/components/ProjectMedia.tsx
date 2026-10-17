import { useEffect, useState } from 'react';
import { Film, ImageIcon } from 'lucide-react';

export type ProjectMediaConfig = {
  /** "video" for .mp4/.webm, "gif" or "image" for .gif/.png/.jpg/.webp */
  type: 'video' | 'gif' | 'image';
  /** Path under /public, e.g. "/media/content-intelligence/demo.mp4". Leave "" to show a placeholder. */
  src: string;
  /** Still frame shown before a video plays (and to reduced-motion users). */
  poster?: string;
  /** What the media shows, for screen readers. */
  alt: string;
};

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
};

const ProjectMedia = ({ media, name }: { media?: ProjectMediaConfig; name: string }) => {
  const reducedMotion = usePrefersReducedMotion();
  const frame = 'relative w-full aspect-video overflow-hidden rounded-lg border bg-muted';

  if (!media || !media.src) {
    const Icon = media?.type === 'video' ? Film : ImageIcon;
    return (
      <div
        className={`${frame} border-dashed flex flex-col items-center justify-center gap-2 text-muted-foreground`}
        role="img"
        aria-label={`${name} demo coming soon`}
      >
        <Icon className="w-8 h-8" aria-hidden="true" />
        <span className="text-sm font-medium">
          {media?.type === 'video' ? 'Demo video coming soon' : 'Screenshot coming soon'}
        </span>
      </div>
    );
  }

  if (media.type === 'video') {
    return (
      <div className={frame}>
        <video
          className="w-full h-full object-cover"
          src={media.src}
          poster={media.poster}
          aria-label={media.alt}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={!reducedMotion}
          controls={reducedMotion}
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <img
        className="w-full h-full object-cover"
        src={media.src}
        alt={media.alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export default ProjectMedia;
