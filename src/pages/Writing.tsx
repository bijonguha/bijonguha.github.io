import PostList from '@/components/PostList';
import { articles } from '@/lib/posts';

const Writing = () => (
  <PostList
    title="Writing"
    pageTitle="Writing"
    intro="Articles on building AI systems: what works, what doesn't, and why."
    items={articles}
    empty="No articles published yet."
  />
);

export default Writing;
