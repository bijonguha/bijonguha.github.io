
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, GitBranch, Zap, Shield, Target, Code, Zap as Robot, Sparkles } from 'lucide-react';
import { bijonConfig } from '@/config/bijonConfig';
import ProjectMedia from '@/components/ProjectMedia';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const getProjectIcon = (category: string) => {
    switch (category) {
      case 'Browser-Based LLMs':
        return <Zap className="w-6 h-6" />;
      case 'AI Infrastructure':
        return <GitBranch className="w-6 h-6" />;
      case 'AI-Powered Tools':
        return <Target className="w-6 h-6" />;
      case 'Developer Tools':
        return <Code className="w-6 h-6" />;
      case 'Agentic AI':
        return <Robot className="w-6 h-6" />;
      case 'AI Agent Skills':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-20 bg-muted/30">
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
                    {project.isUnderDevelopment && (
                      <Badge className="animate-pulse bg-amber-500 hover:bg-amber-600 px-3 py-1">
                        Under Development
                      </Badge>
                    )}
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

                  <div className="flex flex-wrap gap-x-3 gap-y-2 mt-16 pt-4 border-t border-border/40">
                    {project.techStack.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs font-medium px-3 py-1.5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="lg:col-span-1 p-8 bg-muted/30">
                  <div className="mb-6">
                    <ProjectMedia media={project.media} name={project.name} />
                  </div>
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

                  {project.isUnderDevelopment && project.links.live ? (
                    <div className="flex gap-3 mt-6">
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-center hover:bg-amber-500/20 transition-colors"
                      >
                        <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                          🚀 Coming Soon - Beta Link
                        </p>
                      </a>
                    </div>
                  ) : (project.links.live || project.links.code) ? (
                    <div className="flex gap-3 mt-6">
                      {project.links.live && (
                        <Button size="sm" className="flex-1" asChild>
                          <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live App
                          </a>
                        </Button>
                      )}
                      {project.links.code && (
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <a href={project.links.code} target="_blank" rel="noopener noreferrer">
                            View Code
                          </a>
                        </Button>
                      )}
                    </div>
                  ) : null}
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
