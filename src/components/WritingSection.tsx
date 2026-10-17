import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/WritingCards';
import { caseStudies } from '@/lib/posts';

/**
 * Homepage teaser: only the top case studies (those marked `featured: true`).
 * All case studies live on /case-studies; articles on /writing.
 */
const WritingSection = () => {
  const featured = caseStudies.filter((p) => p.featured);
  // Until any case study is featured, fall back to the first three.
  const top = (featured.length > 0 ? featured : caseStudies).slice(0, 3);

  if (top.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Top Case Studies</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            How I've applied AI with clients, and what I've learned along the way
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {top.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild>
            <Link to="/case-studies">
              View all case studies
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WritingSection;
