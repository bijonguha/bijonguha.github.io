
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { bijonConfig } from '@/config/bijonConfig';

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Peer Reviews & Industry Trust
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Endorsed by senior AI leaders from Fortune 500 companies who have experienced my expertise firsthand
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bijonConfig.testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-sm font-mono text-muted-foreground mb-2">
                    ┌─ PEER REVIEW ──────────────────────┐
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({testimonial.category})
                    </span>
                  </div>
                </div>

                <blockquote className="text-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                <div className="border-t pt-4">
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.position} @ {testimonial.company}
                  </div>
                </div>

                <div className="text-sm font-mono text-muted-foreground mt-4">
                  └─────────────────────────────────────┘
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
