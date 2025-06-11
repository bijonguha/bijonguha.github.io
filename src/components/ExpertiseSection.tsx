
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Eye, Cpu, Calculator } from 'lucide-react';
import { bijonConfig } from '@/config/bijonConfig';

const ExpertiseSection = () => {
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            AI Knowledge Graph
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep expertise spanning from theoretical foundations to production systems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
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

        {/* Interactive timeline */}
        <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 border">
          <h3 className="text-3xl font-bold text-center mb-12">
            From Theory to Production Timeline
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>
            
            <div className="space-y-12">
              {bijonConfig.timeline.map((item, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Card className="inline-block max-w-md hover:shadow-lg transition-all duration-300">
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
                  <div className="relative z-10 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg"></div>
                  
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
