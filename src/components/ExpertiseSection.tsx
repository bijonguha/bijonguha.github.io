
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Brain, Eye, Cpu, Calculator, Network } from 'lucide-react';
import { bijonConfig } from '@/config/bijonConfig';

import boschLogo from '@/assets/logos/bosch.svg';
import cargillLogo from '@/assets/logos/cargill.svg';
import qpiaiLogo from '@/assets/logos/qpiai.svg';
import siemensLogo from '@/assets/logos/siemens.svg';
import compassDigitalLogo from '@/assets/logos/compass-digital.svg';
import fordLogo from '@/assets/logos/ford.svg';
import intelLogo from '@/assets/logos/intel.svg';
import neomLogo from '@/assets/logos/neom.svg';

const LOGO_MAP: Record<string, string> = {
  bosch: boschLogo,
  cargill: cargillLogo,
  qpiai: qpiaiLogo,
  siemens: siemensLogo,
  'compass-digital': compassDigitalLogo,
  ford: fordLogo,
  intel: intelLogo,
  neom: neomLogo,
};

type UseCase = {
  name: string;
  client: string;
  logo: string;
  role: string;
  description: string;
};

// Hub-and-spoke coordinates for the knowledge graph diagram (viewBox 0 0 900 500)
const GRAPH_HUB = { x: 450, y: 250 };
const GRAPH_NODES = [
  { x: 150, y: 120 }, // Generative AI — top-left
  { x: 750, y: 120 }, // Computer Vision — top-right
  { x: 150, y: 380 }, // Production ML — bottom-left
  { x: 750, y: 380 }, // Mathematical Foundations — bottom-right
];

const ExpertiseSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(() =>
    bijonConfig.timeline.map(() => false)
  );

  const graphRef = useRef<HTMLDivElement>(null);
  const [graphVisible, setGraphVisible] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [activeUseCase, setActiveUseCase] = useState<UseCase | null>(null);

  useEffect(() => {
    const el = graphRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGraphVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

  const getExpertiseIcon = (name: string, className = 'w-8 h-8') => {
    switch (name) {
      case 'Generative AI':
        return <Brain className={className} />;
      case 'Computer Vision':
        return <Eye className={className} />;
      case 'Production ML':
        return <Cpu className={className} />;
      case 'Mathematical Foundations':
        return <Calculator className={className} />;
      default:
        return <Brain className={className} />;
    }
  };

  const maxYears = Math.max(...bijonConfig.expertise.coreAreas.map((a) => a.yearsExperience));
  const RING_RADIUS = 20;
  const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

  return (
    <>
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Faint circuit texture, echoes the graph theme without competing with the white bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.4]">
        <div className="absolute inset-0 bg-[radial-gradient(circle,hsl(var(--foreground)/0.06)_1px,transparent_1px)] bg-[length:28px_28px]"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Knowledge Graph
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep expertise spanning from theoretical foundations to production systems
          </p>
        </div>

        {/* Hub-and-spoke diagram: one core practice, four connected pillars */}
        <div ref={graphRef} className="relative w-full max-w-3xl mx-auto aspect-[9/5] mb-8">
          <svg viewBox="0 0 900 500" className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
            {GRAPH_NODES.map((node, index) => {
              const isActive = activeNode === index;
              return (
                <path
                  key={index}
                  d={`M${GRAPH_HUB.x},${GRAPH_HUB.y} L${node.x},${node.y}`}
                  fill="none"
                  stroke={isActive ? 'hsl(var(--primary))' : 'hsl(var(--foreground) / 0.15)'}
                  strokeWidth={isActive ? 3 : 2}
                  strokeLinecap="round"
                  className="graph-line transition-all duration-300"
                  style={{
                    strokeDasharray: 620,
                    strokeDashoffset: graphVisible ? 0 : 620,
                    transition: `stroke-dashoffset 1s ease-out ${index * 0.15}s, stroke 0.3s ease, stroke-width 0.3s ease`,
                  }}
                />
              );
            })}
          </svg>

          {/* Hub node */}
          <div
            className={`graph-node absolute flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-700 ${
              graphVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${(GRAPH_HUB.x / 900) * 100}%`,
              top: `${(GRAPH_HUB.y / 500) * 100}%`,
              transform: `translate(-50%, -50%) scale(${graphVisible ? 1 : 0.5})`,
            }}
          >
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping-slow"></span>
            <Network className="w-7 h-7 md:w-8 md:h-8 relative" />
            <span className="text-[9px] md:text-[10px] font-semibold mt-1 relative">CORE</span>
          </div>

          {/* Category nodes */}
          {bijonConfig.expertise.coreAreas.map((area, index) => {
            const node = GRAPH_NODES[index];
            const isActive = activeNode === index;
            return (
              <button
                key={index}
                type="button"
                onMouseEnter={() => setActiveNode(index)}
                onMouseLeave={() => setActiveNode(null)}
                onFocus={() => setActiveNode(index)}
                onBlur={() => setActiveNode(null)}
                onClick={() => document.getElementById(`expertise-card-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                className={`graph-node absolute flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 bg-card shadow-md transition-all duration-500 cursor-pointer ${
                  graphVisible ? 'opacity-100' : 'opacity-0'
                } ${isActive ? 'border-primary shadow-xl' : 'border-border'}`}
                style={{
                  left: `${(node.x / 900) * 100}%`,
                  top: `${(node.y / 500) * 100}%`,
                  transform: `translate(-50%, -50%) scale(${(graphVisible ? 1 : 0.5) * (isActive ? 1.1 : 1)})`,
                  transitionDelay: graphVisible ? `${0.3 + index * 0.15}s` : '0s',
                }}
              >
                <span className={`transition-colors ${isActive ? 'text-primary' : 'text-foreground/70'}`}>
                  {getExpertiseIcon(area.name, 'w-5 h-5 md:w-6 md:h-6')}
                </span>
                <span className="hidden sm:block text-[9px] md:text-[10px] font-medium mt-1 text-center leading-tight px-1">
                  {area.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail cards — connected to the diagram above via matching hover state */}
        <div className="grid md:grid-cols-2 gap-8">
          {bijonConfig.expertise.coreAreas.map((area, index) => {
            const ringPct = area.yearsExperience / maxYears;
            const isActive = activeNode === index;
            return (
              <Card
                key={index}
                id={`expertise-card-${index}`}
                onMouseEnter={() => setActiveNode(index)}
                onMouseLeave={() => setActiveNode(null)}
                className={`transition-all duration-300 transform hover:-translate-y-2 border-t-4 ${
                  isActive ? 'border-t-primary shadow-xl -translate-y-1' : 'border-t-primary/40 hover:shadow-lg'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative flex-none w-16 h-16">
                      <svg viewBox="0 0 48 48" className="w-16 h-16 -rotate-90">
                        <circle cx="24" cy="24" r={RING_RADIUS} fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                        <circle
                          cx="24"
                          cy="24"
                          r={RING_RADIUS}
                          fill="none"
                          stroke="hsl(var(--primary))"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={RING_CIRCUMFERENCE}
                          strokeDashoffset={RING_CIRCUMFERENCE * (1 - ringPct)}
                          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-primary">
                        {getExpertiseIcon(area.name, 'w-6 h-6')}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{area.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{area.level}</Badge>
                        <span className="text-sm text-muted-foreground">{area.yearsExperience} years</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="font-semibold text-foreground mb-3">Specializations:</h4>
                  <div className="flex flex-wrap gap-2">
                    {area.subAreas.map((subArea, subIndex) => (
                      <span
                        key={subIndex}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border"
                      >
                        {subArea}
                      </span>
                    ))}
                  </div>

                  {/* Client use cases — compact logo row, click for details */}
                  {area.useCases && area.useCases.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-border/60">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                        Used in production at:
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {area.useCases.map((useCase, ucIndex) => (
                          <Tooltip key={ucIndex}>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() => setActiveUseCase(useCase)}
                                className="w-9 h-9 rounded-full overflow-hidden border border-border grayscale hover:grayscale-0 hover:scale-110 hover:border-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                aria-label={`View ${useCase.name} case study`}
                              >
                                <img src={LOGO_MAP[useCase.logo]} alt={useCase.client} className="w-full h-full object-cover" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="font-medium">{useCase.name}</p>
                              <p className="text-xs text-muted-foreground">{useCase.client}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  )}

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
            );
          })}
        </div>
      </div>

      {/* Use case detail modal */}
      <Dialog open={!!activeUseCase} onOpenChange={(open) => !open && setActiveUseCase(null)}>
        <DialogContent className="sm:max-w-md">
          {activeUseCase && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border flex-none">
                    <img src={LOGO_MAP[activeUseCase.logo]} alt={activeUseCase.client} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <DialogTitle>{activeUseCase.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{activeUseCase.client} · {activeUseCase.role}</p>
                  </div>
                </div>
                <DialogDescription className="text-foreground/90 leading-relaxed pt-2">
                  {activeUseCase.description}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
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
