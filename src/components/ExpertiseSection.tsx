
import { useEffect, useRef, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Eye, Cpu, Calculator } from 'lucide-react';
import { bijonConfig } from '@/config/bijonConfig';

const ExpertiseSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() =>
    bijonConfig.timeline.map(() => false)
  );

  // Reveal each milestone as it scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setVisibleItems((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Fill the connecting line as the reader progresses down the timeline
  useEffect(() => {
    const track = timelineRef.current;
    const fill = lineFillRef.current;
    if (!track || !fill) return;

    let raf = 0;
    const update = () => {
      const rect = track.getBoundingClientRect();
      const scrolled = Math.min(Math.max(window.innerHeight * 0.65 - rect.top, 0), rect.height);
      const pct = rect.height > 0 ? (scrolled / rect.height) * 100 : 0;
      fill.style.height = `${pct}%`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const getExpertiseIcon = (name: string) => {
    switch (name) {
      case 'Generative AI':
        return <Brain className="w-8 h-8" />;
      case 'Computer Vision':
        return <Eye className="w-8 h-8" />;
      case 'Production ML':
        return <Cpu className="w-8 h-8" />;
      case 'Mathematical Foundations':
        return <Calculator className="w-8 h-8" />;
      default:
        return <Brain className="w-8 h-8" />;
    }
  };

  const getProgressValue = (years: number) => {
    return Math.min((years / 6) * 100, 100); // Max 6 years = 100%
  };

  return (
    <>
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Knowledge Graph
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep expertise spanning from theoretical foundations to production systems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {bijonConfig.expertise.coreAreas.map((area, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-l-primary">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl text-primary">
                    {getExpertiseIcon(area.name)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold mb-2">
                      {area.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{area.level}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {area.yearsExperience} years
                      </span>
                    </div>
                  </div>
                </div>
                
                <Progress 
                  value={getProgressValue(area.yearsExperience)} 
                  className="h-2"
                />
              </CardHeader>
              
              <CardContent>
                <h4 className="font-semibold text-foreground mb-3">Specializations:</h4>
                <div className="space-y-2">
                  {area.subAreas.map((subArea, subIndex) => (
                    <div key={subIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">{subArea}</span>
                    </div>
                  ))}
                </div>

                {/* Add relevant testimonial indicator */}
                {(() => {
                  const relevantTestimonial = bijonConfig.testimonials.find(t => 
                    t.category.toLowerCase().includes(area.name.toLowerCase().split(' ')[0])
                  );
                  
                  if (relevantTestimonial) {
                    return (
                      <div className="mt-4 p-3 bg-background/50 rounded-lg border-l-2 border-l-accent">
                        <p className="text-xs text-muted-foreground">
                          Endorsed by {relevantTestimonial.name} @ {relevantTestimonial.company}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })()}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* Interactive timeline — full-bleed anchor section (fixed dark band, does not flip with theme) */}
    <section className="relative py-20 bg-slate-900 text-slate-50 overflow-hidden">
      {/* Textured background: dot grid + circuit lines + drifting glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_16px)]"></div>
        <div className="timeline-blob absolute -top-24 -left-24 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl"></div>
        <div className="timeline-blob-reverse absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-indigo-500/10 blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
          From Theory to Production Timeline
        </h3>
        <p className="text-slate-300 text-center max-w-2xl mx-auto mb-12">
          Seven years, one throughline: mathematical foundations to production AI systems.
        </p>

        <div className="relative" ref={timelineRef}>
          {/* Timeline line: static track + scroll-filled progress */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-1 bg-white/10 md:block hidden overflow-hidden rounded-full">
            <div
              ref={lineFillRef}
              className="w-full bg-gradient-to-b from-sky-400 to-primary rounded-full transition-[height] duration-150 ease-out"
              style={{ height: '0%' }}
            ></div>
          </div>

          <div className="space-y-12">
            {bijonConfig.timeline.map((item, index) => (
              <div
                key={index}
                data-index={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`timeline-reveal flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8 gap-4 ${
                  visibleItems[index]
                    ? 'opacity-100 translate-x-0'
                    : `opacity-0 ${index % 2 === 0 ? 'md:-translate-x-10' : 'md:translate-x-10'} translate-y-6 md:translate-y-0`
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-left`}>
                  <Card className="inline-block max-w-md hover:shadow-lg transition-all duration-300 bg-card text-card-foreground">
                    <CardContent className="p-6">
                      <div className="font-bold text-2xl text-primary mb-2">
                        {item.year}
                      </div>
                      <h4 className="font-semibold text-lg mb-2">
                        {item.milestone}
                      </h4>
                      <p className="text-muted-foreground mb-3">
                        {item.description}
                      </p>
                      <div className="text-sm">
                        <span className="font-semibold">Achievement:</span>
                        <br />
                        {item.achievement}
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        Testimonial: {item.testimonial}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <div className="relative z-10 w-6 h-6 md:block hidden">
                  {visibleItems[index] && (
                    <span className="timeline-dot-pulse absolute inset-0 rounded-full bg-sky-400/60"></span>
                  )}
                  <div
                    className={`relative w-6 h-6 rounded-full border-4 border-slate-900 shadow-lg transition-colors duration-500 ${
                      visibleItems[index] ? 'bg-sky-400' : 'bg-white'
                    }`}
                  ></div>
                </div>

                <div className="flex-1 md:block hidden"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ExpertiseSection;
