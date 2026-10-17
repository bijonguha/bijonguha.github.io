
import { useState } from 'react';
import { Pause, Play, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { bijonConfig } from '@/config/bijonConfig';
import LinkedInIcon from '@/components/icons/LinkedInIcon';

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

type Testimonial = (typeof bijonConfig.testimonials)[number];

const TestimonialCard = ({
  testimonial,
  duplicate,
  expanded,
  onToggle,
}: {
  testimonial: Testimonial;
  duplicate: boolean;
  expanded: boolean;
  onToggle: () => void;
}) => {
  const tab = duplicate ? -1 : undefined;
  return (
    <Card
      aria-hidden={duplicate || undefined}
      className="relative flex-none w-[300px] sm:w-[380px] overflow-hidden border-t-4 border-t-primary/70 self-start"
    >
      <CardContent className="p-6 flex flex-col">
        <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/10" aria-hidden="true" />

        <div className="flex items-start gap-3 mb-4">
          <div className="flex-none w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
            {getInitials(testimonial.name)}
          </div>
          <div className="min-w-0">
            <a
              href={testimonial.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={tab}
              className="inline-flex items-center gap-1.5 font-semibold text-foreground hover:text-primary transition-colors"
            >
              {testimonial.name}
              <LinkedInIcon className="w-3.5 h-3.5" />
            </a>
            <div className="text-sm text-muted-foreground">
              {testimonial.position} @ {testimonial.company}
            </div>
          </div>
        </div>

        <blockquote className={`text-sm text-foreground/90 leading-relaxed ${expanded ? '' : 'line-clamp-6'}`}>
          "{testimonial.text}"
        </blockquote>
        <button
          type="button"
          tabIndex={tab}
          onClick={onToggle}
          aria-expanded={expanded}
          className="self-start mt-2 mb-4 text-sm font-medium text-primary hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>

        <div className="pt-4 border-t flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">
            {testimonial.relationship} · {testimonial.date}
          </span>
          <Badge variant="secondary" className="text-[10px] flex-none">
            {testimonial.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  const [paused, setPaused] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Peer Reviews & Industry Trust
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real LinkedIn recommendations from senior AI leaders who have worked with me directly
          </p>
        </div>

        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play testimonials carousel' : 'Pause testimonials carousel'}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-background transition-colors motion-reduce:hidden"
          >
            {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>

        <div
          className="testimonial-marquee overflow-hidden -mx-6 px-6 py-2"
          data-paused={paused || expandedId !== null}
          role="region"
          aria-label="Recommendations from colleagues"
        >
          <div className="testimonial-track flex w-max gap-6 items-start">
            {[false, true].map((duplicate) =>
              bijonConfig.testimonials.map((testimonial) => (
                <TestimonialCard
                  key={`${duplicate ? 'dup' : 'main'}-${testimonial.id}`}
                  testimonial={testimonial}
                  duplicate={duplicate}
                  expanded={expandedId === testimonial.id}
                  onToggle={() =>
                    setExpandedId((id) => (id === testimonial.id ? null : testimonial.id))
                  }
                />
              ))
            )}
          </div>
        </div>

        {/* Trust metrics */}
        <div className="mt-16 bg-background/50 backdrop-blur-sm rounded-2xl p-8 border">
          <h3 className="text-2xl font-bold text-center mb-8">AI CREDIBILITY DASHBOARD</h3>
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {bijonConfig.metrics.fortune500Companies}
              </div>
              <div className="text-sm text-muted-foreground">
                Fortune 500 Companies
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {bijonConfig.metrics.aiSpecializations}
              </div>
              <div className="text-sm text-muted-foreground">
                AI Specializations
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {bijonConfig.metrics.yearsInAI}
              </div>
              <div className="text-sm text-muted-foreground">
                Years in AI
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
