import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import ClientLogo from '@/components/ClientLogo';
import { type Post, KIND_LABEL, externalSite, formatDate, postPath } from '@/lib/posts';

const Cover = ({ src, label }: { src?: string; label: string }) => (
  <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
    {src ? (
      <img src={src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/40">
        <span className="px-6 text-center text-lg font-semibold text-muted-foreground/70 line-clamp-2">{label}</span>
      </div>
    )}
  </div>
);

/** One card for a case study or an article. The whole card is clickable. */
export const PostCard = ({ post }: { post: Post }) => {
  const stretched = 'after:absolute after:inset-0 focus:outline-none focus-visible:underline';
  const site = post.external ? externalSite(post.external) : '';

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all">
      <Cover src={post.cover} label={post.client ?? post.title} />
      <div className="flex flex-col flex-1 gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{KIND_LABEL[post.kind]}</Badge>
          {post.area && <Badge variant="outline">{post.area}</Badge>}
          {post.draft && <Badge className="bg-amber-500 hover:bg-amber-500 text-white">Draft</Badge>}
        </div>
        <h3 className="text-lg font-bold leading-snug">
          {post.external ? (
            <a href={post.external} target="_blank" rel="noopener noreferrer" className={stretched}>
              {post.title}
              <span className="sr-only"> (opens {site} in a new tab)</span>
            </a>
          ) : (
            <Link to={postPath(post)} className={stretched}>
              {post.title}
            </Link>
          )}
        </h3>
        {post.summary && <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.summary}</p>}
        <div className="mt-auto pt-3 border-t flex items-center justify-between gap-2 text-xs text-muted-foreground">
          {post.client ? (
            <ClientLogo client={post.client} logo={post.logo} className="text-xs" />
          ) : (
            <span>{formatDate(post.date)}</span>
          )}
          {post.external ? (
            <span className="inline-flex items-center gap-1 font-medium text-foreground flex-none">
              Read on {site} <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 flex-none">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {post.readingMinutes} min read
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
