import PostList from '@/components/PostList';
import { articles, caseStudies } from '@/lib/posts';

const CaseStudies = () => (
  <PostList
    title="Case studies"
    pageTitle="Case studies"
    intro="How I've applied AI with clients, and what I've learned along the way."
    items={caseStudies}
    empty="No case studies published yet."
    secondary={{ title: 'Articles', items: articles }}
  />
);

export default CaseStudies;
