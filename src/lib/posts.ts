/**
 * Everything under "Case studies & writing" is a Markdown file:
 *   src/content/case-studies/*.md   client work and project write-ups
 *   src/content/articles/*.md       blog articles
 *
 * Each file starts with a front-matter block between --- lines, for example:
 *
 * ---
 * title: Breaking the latency barrier in AI agents
 * summary: One line shown on cards and in link previews.
 * date: 2025-06-04           # YYYY-MM-DD; newest first
 * area: Generative AI        # optional, used for filtering
 * tags: [LLM agents, Latency]
 * cover: /media/articles/latency/cover.png   # optional, image under public/
 * gallery: [/media/articles/latency/1.png, /media/articles/latency/demo.gif]   # optional, extra images, GIFs or videos
 * client: Siemens            # optional (case studies)
 * logo: siemens              # optional, one of the logos in src/assets/logos
 * role: Lead Developer       # optional (case studies)
 * project: MisterMD          # optional, links a project card to this post
 * external: https://...      # optional, the card links here instead (e.g. an older Medium post)
 * featured: true             # optional, shown first on the homepage
 * draft: true                # drafts never appear in lists; preview locally with ?drafts
 * ---
 *
 * The file name (without .md) becomes the URL: /case-studies/<file-name> for case
 * studies and /writing/<file-name> for articles. Keep names unique across both folders. Files starting with "_" are ignored.
 */

export type PostKind = 'case-study' | 'article';

export type Post = {
  kind: PostKind;
  slug: string;
  title: string;
  summary: string;
  date?: string;
  client?: string;
  logo?: string;
  role?: string;
  area?: string;
  tags: string[];
  cover?: string;
  gallery: string[];
  project?: string;
  external?: string;
  featured: boolean;
  draft: boolean;
  body: string;
  readingMinutes: number;
};

const glob = {
  'case-study': import.meta.glob('/src/content/case-studies/*.md', { query: '?raw', import: 'default', eager: true }),
  article: import.meta.glob('/src/content/articles/*.md', { query: '?raw', import: 'default', eager: true }),
} as Record<PostKind, Record<string, string>>;

const unquote = (v: string) => v.replace(/^["'](.*)["']$/, '$1').trim();

const parseValue = (raw: string): string | string[] | boolean => {
  const v = raw.replace(/(^|\s+)#.*$/, '').trim(); // drop "# comment"
  if (v === 'true') return true;
  if (v === 'false') return false;
  if (v.startsWith('[') && v.endsWith(']')) {
    return v
      .slice(1, -1)
      .split(',')
      .map((s) => unquote(s.trim()))
      .filter(Boolean);
  }
  return unquote(v);
};

const parse = (kind: PostKind, path: string, raw: string): Post | null => {
  const slug = path.split('/').pop()!.replace(/\.md$/, '');
  if (slug.startsWith('_')) return null;

  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  const meta: Record<string, string | string[] | boolean> = {};
  let body = raw;
  if (match) {
    body = match[2];
    for (const line of match[1].split('\n')) {
      const m = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
      if (m) meta[m[1]] = parseValue(m[2]);
    }
  }

  const str = (k: string) => (typeof meta[k] === 'string' && meta[k] ? (meta[k] as string) : undefined);
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    kind,
    slug,
    title: str('title') ?? slug,
    summary: str('summary') ?? '',
    date: str('date'),
    client: str('client'),
    logo: str('logo'),
    role: str('role'),
    area: str('area'),
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    cover: str('cover'),
    gallery: Array.isArray(meta.gallery) ? meta.gallery : [],
    project: str('project'),
    external: str('external'),
    featured: meta.featured === true,
    draft: meta.draft === true,
    body,
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
};

/**
 * Drafts never appear in lists on the live site. While running locally, add
 * ?drafts to the address (e.g. /case-studies?drafts) to list them too, or open a
 * draft's own address directly to preview it.
 */
export const showDrafts =
  import.meta.env.DEV && typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('drafts');

const byFeaturedThenDate = (a: Post, b: Post) => {
  if (a.featured !== b.featured) return a.featured ? -1 : 1;
  if (a.date && b.date) return b.date.localeCompare(a.date);
  if (a.date) return -1;
  if (b.date) return 1;
  return a.title.localeCompare(b.title);
};

const allPosts: Post[] = (Object.keys(glob) as PostKind[])
  .flatMap((kind) => Object.entries(glob[kind]).map(([path, raw]) => parse(kind, path, raw)))
  .filter((p): p is Post => p !== null)
  .sort(byFeaturedThenDate);

/** Published posts (plus drafts when previewing locally with ?drafts). */
export const posts: Post[] = allPosts.filter((p) => showDrafts || !p.draft);

export const caseStudies = posts.filter((p) => p.kind === 'case-study');

/** Articles, newest first (featured doesn't reorder them). */
export const articles = posts
  .filter((p) => p.kind === 'article')
  .sort((a, b) => byFeaturedThenDate({ ...a, featured: false }, { ...b, featured: false }));

export const KIND_LABEL: Record<PostKind, string> = { 'case-study': 'Case study', article: 'Article' };

/** Display order for the area filter; areas not listed come last. */
export const AREA_ORDER = ['Generative AI', 'Computer Vision', 'Production ML', 'Mathematical Foundations', 'Developer Tools'];

/** Locally, a draft's own page always opens so you can preview it. */
export const getPost = (slug: string) =>
  (import.meta.env.DEV ? allPosts : posts).find((p) => p.slug === slug);

export const postForProject = (projectName: string) =>
  caseStudies.find((p) => p.project === projectName && !p.external) ??
  posts.find((p) => p.project === projectName && !p.external);

/** The page for a post: /case-studies/<slug> or /writing/<slug>. */
export const postPath = (p: Pick<Post, 'kind' | 'slug'>) =>
  p.kind === 'case-study' ? `/case-studies/${p.slug}` : `/writing/${p.slug}`;

/** Where a card should link: the post page, or its external original. */
export const postHref = (p: Post) => p.external ?? postPath(p);

export const externalSite = (url: string) => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return host.includes('medium.com') ? 'Medium' : host;
  } catch {
    return 'external site';
  }
};

export const formatDate = (date?: string) => {
  if (!date) return '';
  const d = new Date(`${date}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? date
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};
