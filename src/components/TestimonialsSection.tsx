
import { Quote } from 'lucide-react';
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

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Peer Reviews & Industry Trust
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real LinkedIn recommendations from senior AI leaders who have worked with me directly
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bijonConfig.testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-primary/70"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/10" />

                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-none w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    {getInitials(testimonial.name)}
                  </div>
                  <div className="min-w-0">
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
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

                <blockquote className="text-sm text-foreground/90 leading-relaxed mb-4 flex-1">
                  "{testimonial.text}"
                </blockquote>

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
          ))}
        </div>

        {/* Trust metrics */}
        <div className="mt-16 bg-background/50 backdrop-blur-sm rounded-2xl p-8 border">
          <h3 className="text-2xl font-bold text-center mb-8">AI CREDIBILITY DASHBOARD</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {bijonConfig.metrics.endorsements}
              </div>
              <div className="text-sm text-muted-foreground">
                Senior AI Leaders Endorsed
              </div>
            </div>
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
                {bijonConfig.metrics.successRate}
              </div>
              <div className="text-sm text-muted-foreground">
                Production Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
