
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, GitBranch, Zap, Shield, Target } from 'lucide-react';
import { bijonConfig } from '@/config/bijonConfig';

const ProjectsSection = () => {
  const getProjectIcon = (category: string) => {
    switch (category) {
      case 'Browser-Based LLMs':
        return <Zap className="w-6 h-6" />;
      case 'AI Infrastructure':
        return <GitBranch className="w-6 h-6" />;
      case 'AI-Powered Tools':
        return <Target className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Generative AI Projects Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From browser-based LLMs to enterprise AI infrastructure - building the future of AI applications
          </p>
        </div>

        <div className="space-y-12">
          {bijonConfig.projects.map((project, index) => (
            <Card key={project.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 group">
              <div className="grid lg:grid-cols-2 gap-8">
                <CardHeader className="lg:col-span-1 p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {getProjectIcon(project.category)}
                    </div>
                    <Badge variant="secondary" className="px-3 py-1">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  
                  <div className="text-sm text-muted-foreground mb-4">
                    Role: <span className="font-semibold text-foreground">{project.role}</span>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Achievement:</h4>
                      <p className="text-muted-foreground">{project.achievement}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Impact:</h4>
                      <p className="text-primary font-semibold">{project.impact}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.techStack.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="lg:col-span-1 p-8 bg-muted/30">
                  <h4 className="font-semibold text-foreground mb-4">Key Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-semibold text-foreground mb-4">Performance Metrics:</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-background rounded-lg border">
                        <div className="text-2xl font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Find relevant testimonial */}
                  {(() => {
                    const relevantTestimonial = bijonConfig.testimonials.find(t => 
                      (project.category === 'Browser-Based LLMs' && t.category === 'AI Architecture') ||
                      (project.category === 'AI Infrastructure' && t.category === 'Strategic AI/ML') ||
                      (project.category === 'AI-Powered Tools' && t.category === 'Statistical Analysis')
                    );
                    
                    if (relevantTestimonial) {
                      return (
                        <div className="bg-background border-l-4 border-l-primary p-4 rounded-r-lg">
                          <p className="text-sm italic text-muted-foreground mb-2">
                            "{relevantTestimonial.text.substring(0, 100)}..."
                          </p>
                          <div className="text-xs font-semibold">
                            - {relevantTestimonial.name}, {relevantTestimonial.company}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  <div className="flex gap-3 mt-6">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        const demoUrls = {
                          1: 'https://browsermind.vercel.app/',
                          2: 'https://stable-chat-demo.vercel.app/',
                          3: 'https://mr-agile-demo.vercel.app/'
                        };
                        const url = demoUrls[project.id as keyof typeof demoUrls] || '#';
                        if (url !== '#') window.open(url, '_blank');
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        const codeUrls = {
                          1: 'https://github.com/bijonguha/browsermind',
                          2: 'https://github.com/bijonguha/stable-chat',
                          3: 'https://github.com/bijonguha/mr-agile'
                        };
                        const url = codeUrls[project.id as keyof typeof codeUrls] || '#';
                        if (url !== '#') window.open(url, '_blank');
                      }}
                    >
                      View Code
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
