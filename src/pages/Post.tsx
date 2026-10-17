import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clock, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import ClientLogo from '@/components/ClientLogo';
import Markdown from '@/components/Markdown';
import PostGallery from '@/components/PostGallery';
import { PostCard } from '@/components/WritingCards';
import { KIND_LABEL, externalSite, formatDate, getPost, postPath, posts, type PostKind } from '@/lib/posts';
import { bijonConfig } from '@/config/bijonConfig';
import NotFound from './NotFound';

const SITE_NAME = 'Bijon Guha';

const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
};

const PostPage = ({ kind }: { kind: PostKind }) => {
  const { slug = '' } = useParams();
  const study = getPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (study) {
      document.title = `${study.title} | ${SITE_NAME}`;
      if (study.summary) setMeta('description', study.summary);
    }
  }, [study]);

  if (!study) return <NotFound />;
  // A post opened under the other section's address goes to its own address.
  if (study.kind !== kind) return <Navigate to={postPath(study)} replace />;

  const more = posts.filter((p) => p.slug !== study.slug && p.kind === study.kind).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="container mx-auto px-6 pt-28 pb-20">
        <article className="max-w-3xl mx-auto">
          <Link to={study.kind === 'article' ? '/writing' : '/case-studies'} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {study.kind === 'article' ? 'All writing' : 'All case studies'}
          </Link>

          {study.draft && (
            <p className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm text-amber-800 dark:text-amber-300">
              Draft: only visible when running locally. Set <code>draft: false</code> in the file to publish it.
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary">{KIND_LABEL[study.kind]}</Badge>
            {study.area && <Badge variant="outline">{study.area}</Badge>}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">{study.title}</h1>
          {study.summary && <p className="text-xl text-muted-foreground leading-relaxed mb-6">{study.summary}</p>}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-6 mb-8 border-b text-sm text-muted-foreground">
            <ClientLogo client={study.client} logo={study.logo} />
            {study.role && (
              <span>
                Role: <span className="font-medium text-foreground">{study.role}</span>
              </span>
            )}
            {study.date && <time dateTime={study.date}>{formatDate(study.date)}</time>}
            <span className="inline-flex items-center gap-1">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {study.readingMinutes} min read
            </span>
          </div>

          {study.cover && (
            <img src={study.cover} alt="" className="w-full aspect-[16/9] object-cover rounded-xl border mb-10" />
          )}

          {study.external && (
            <p className="mb-8">
              <Button variant="outline" asChild>
                <a href={study.external} target="_blank" rel="noopener noreferrer">
                  Read the original on {externalSite(study.external)}
                  <ArrowUpRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </a>
              </Button>
            </p>
          )}

          <Markdown>{study.body}</Markdown>

          <PostGallery title={study.title} sources={study.gallery} />

          {study.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10">
              {study.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-xl border bg-muted/40 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Working on something similar?</p>
              <p className="text-sm text-muted-foreground">Happy to talk through how this could apply to your team.</p>
            </div>
            <Button asChild>
              <a href={`mailto:${bijonConfig.contact.email}?subject=${encodeURIComponent(`About: ${study.title}`)}`}>
                <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                Email me
              </a>
            </Button>
          </div>
        </article>

        {more.length > 0 && (
          <section className="max-w-6xl mx-auto mt-20" aria-label="More to read">
            <h2 className="text-2xl font-semibold mb-6">{study.kind === 'article' ? 'More articles' : 'More case studies'}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((c) => (
                <PostCard key={c.slug} post={c} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PostPage;
