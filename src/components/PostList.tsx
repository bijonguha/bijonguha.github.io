import { useEffect, useMemo, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { PostCard } from '@/components/WritingCards';
import { AREA_ORDER, showDrafts, type Post } from '@/lib/posts';

const Chip = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
      active ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-muted'
    }`}
  >
    {children}
  </button>
);

/** A full-page list of posts (case studies or articles) with area filters. */
const PostList = ({
  title,
  intro,
  pageTitle,
  items,
  empty,
  secondary,
}: {
  title: string;
  intro: string;
  pageTitle: string;
  items: Post[];
  empty: string;
  /** Optional second list shown below the first, e.g. articles. */
  secondary?: { title: string; items: Post[] };
}) => {
  const [area, setArea] = useState<string | undefined>();

  useEffect(() => {
    document.title = `${pageTitle} | Bijon Guha`;
    window.scrollTo(0, 0);
  }, [pageTitle]);

  const areas = useMemo(
    () =>
      [...new Set([...items, ...(secondary?.items ?? [])].map((p) => p.area).filter((a): a is string => Boolean(a)))].sort(
        (a, b) => (AREA_ORDER.indexOf(a) + 1 || 99) - (AREA_ORDER.indexOf(b) + 1 || 99)
      ),
    [items, secondary]
  );

  const shown = items.filter((p) => !area || p.area === area);
  const shownSecondary = (secondary?.items ?? []).filter((p) => !area || p.area === area);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="container mx-auto px-6 pt-32 pb-20">
        <header className="max-w-3xl mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground">{intro}</p>
          {showDrafts && (
            <p className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm text-amber-800 dark:text-amber-300">
              Draft preview: drafts are listed because the address has <code>?drafts</code>. They never appear on the live site.
            </p>
          )}
        </header>

        {areas.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by area">
            <Chip active={!area} onClick={() => setArea(undefined)}>All</Chip>
            {areas.map((a) => (
              <Chip key={a} active={area === a} onClick={() => setArea(area === a ? undefined : a)}>
                {a}
              </Chip>
            ))}
          </div>
        )}

        {shown.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          !shownSecondary.length && <p className="text-muted-foreground">{empty}</p>
        )}

        {secondary && shownSecondary.length > 0 && (
          <section aria-label={secondary.title} className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">{secondary.title}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shownSecondary.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PostList;
