import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ExternalLink,
  GitBranch,
  Zap,
  Shield,
  Target,
  Code,
  Zap as Robot,
  Sparkles,
  Github,
  ArrowRight,
} from 'lucide-react';
import { bijonConfig } from '@/config/bijonConfig';
import ProjectThumbnail from '@/components/ProjectMedia';
import { Link } from 'react-router-dom';
import { postForProject, postPath } from '@/lib/posts';
import './ProjectsSection.css';

type Project = (typeof bijonConfig.projects)[number];

const getProjectIcon = (category: string) => {
  const cls = 'w-4 h-4';
  switch (category) {
    case 'Browser-Based LLMs':
      return <Zap className={cls} />;
    case 'AI Infrastructure':
      return <GitBranch className={cls} />;
    case 'AI-Powered Tools':
      return <Target className={cls} />;
    case 'Developer Tools':
      return <Code className={cls} />;
    case 'Agentic AI':
      return <Robot className={cls} />;
    case 'AI Agent Skills':
      return <Sparkles className={cls} />;
    default:
      return <Shield className={cls} />;
  }
};

const metricLabel = (key: string) => key.replace(/([A-Z])/g, ' $1').trim();

const ProjectLinks = ({ project, full = false }: { project: Project; full?: boolean }) => {
  const { live, code } = project.links;
  if (!live && !code) return null;
  const liveLabel = project.isUnderDevelopment ? 'Try the beta' : 'Live app';
  return (
    <div className="flex gap-2">
      {live && (
        <Button size="sm" variant={full ? 'default' : 'ghost'} asChild className={full ? 'flex-1' : 'px-2'}>
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${liveLabel}: ${project.name} (opens in a new tab)`}
            title={liveLabel}
          >
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
            {full && <span className="ml-2">{liveLabel}</span>}
          </a>
        </Button>
      )}
      {code && (
        <Button size="sm" variant={full ? 'outline' : 'ghost'} asChild className={full ? 'flex-1' : 'px-2'}>
          <a
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Code for ${project.name} on GitHub (opens in a new tab)`}
            title="View code"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
            {full && <span className="ml-2">View code</span>}
          </a>
        </Button>
      )}
    </div>
  );
};

const ProjectDetails = ({ project }: { project: Project }) => (
  <div className="space-y-6">
    <ProjectThumbnail name={project.name} thumbnail={project.thumbnail} media={project.media} />

    <div className="text-sm text-muted-foreground">
      Role: <span className="font-semibold text-foreground">{project.role}</span>
    </div>

    <p className="text-muted-foreground leading-relaxed">{project.description}</p>

    <div>
      <h4 className="font-semibold mb-1">What I built</h4>
      <p className="text-muted-foreground leading-relaxed">{project.achievement}</p>
    </div>

    <div>
      <h4 className="font-semibold mb-1">Impact</h4>
      <p className="text-foreground font-medium leading-relaxed">{project.impact}</p>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Key features</h4>
      <ul className="space-y-1.5">
        {project.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-muted-foreground">
            <span className="mt-2 w-1.5 h-1.5 flex-none rounded-full bg-primary" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Object.entries(project.metrics).map(([key, value]) => (
        <div key={key} className="text-center p-3 bg-muted/50 rounded-lg border">
          <div className="text-lg font-bold">{value}</div>
          <div className="text-xs text-muted-foreground capitalize">{metricLabel(key)}</div>
        </div>
      ))}
    </div>

    <div className="flex flex-wrap gap-2">
      {project.techStack.map((tech) => (
        <Badge key={tech} variant="outline" className="text-xs font-medium">
          {tech}
        </Badge>
      ))}
    </div>

    <ProjectLinks project={project} full />

    {(() => {
      const study = postForProject(project.name);
      return study ? (
        <Button variant="secondary" className="w-full" asChild>
          <Link to={postPath(study)}>
            {study.kind === 'article' ? 'Read the article' : 'Read the case study'}
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Link>
        </Button>
      ) : null;
    })()}
  </div>
);

const ProjectCard = ({ project, onOpen }: { project: Project; onOpen: () => void }) => {
  const shownTags = project.techStack.slice(0, 3);
  const extraTags = project.techStack.length - shownTags.length;

  return (
    <Card className="flex flex-col h-full overflow-hidden border hover:border-primary/40 hover:shadow-lg transition-all duration-300">
      <div className="p-4 pb-0">
        <ProjectThumbnail name={project.name} thumbnail={project.thumbnail} media={project.media} />
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 px-2.5 py-1">
            {getProjectIcon(project.category)}
            {project.category}
          </Badge>
          {project.isUnderDevelopment && (
            <Badge className="bg-amber-500 hover:bg-amber-500 text-white px-2.5 py-1">In beta</Badge>
          )}
        </div>

        <h3 className="text-xl font-bold leading-tight">{project.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.tagline}</p>

        <div className="flex flex-wrap gap-1.5">
          {shownTags.map((tech) => (
            <Badge key={tech} variant="outline" className="text-[11px] font-medium px-2 py-0.5">
              {tech}
            </Badge>
          ))}
          {extraTags > 0 && (
            <Badge variant="outline" className="text-[11px] font-medium px-2 py-0.5 text-muted-foreground">
              +{extraTags}
            </Badge>
          )}
        </div>

        <div className="mt-auto pt-3 border-t flex items-center justify-between gap-2 min-h-[3rem]">
          <Button variant="link" size="sm" className="px-0 h-auto font-semibold" onClick={onOpen}>
            View details
            <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Button>
          <ProjectLinks project={project} />
        </div>
      </div>
    </Card>
  );
};

const ProjectsSection = () => {
  const [openId, setOpenId] = useState<number | null>(null);
  const openProject = bijonConfig.projects.find((p) => p.id === openId);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Generative AI Projects Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From browser-based LLMs to enterprise AI infrastructure - building the future of AI applications
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bijonConfig.projects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setOpenId(project.id)} />
          ))}
        </div>
      </div>

      <Dialog open={openProject !== undefined} onOpenChange={(open) => !open && setOpenId(null)}>
        {openProject && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <Badge variant="secondary" className="gap-1.5">
                  {getProjectIcon(openProject.category)}
                  {openProject.category}
                </Badge>
                {openProject.isUnderDevelopment && (
                  <Badge className="bg-amber-500 hover:bg-amber-500 text-white">In beta</Badge>
                )}
              </div>
              <DialogTitle className="text-2xl">{openProject.name}</DialogTitle>
              <DialogDescription>{openProject.tagline}</DialogDescription>
            </DialogHeader>
            <ProjectDetails project={openProject} />
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
