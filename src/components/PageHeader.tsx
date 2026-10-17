import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { bijonConfig } from '@/config/bijonConfig';

const resumeHref = `${import.meta.env.BASE_URL}${bijonConfig.navigation.resume.file}`;

/** Header for pages other than the homepage (case studies and the writing list). */
const PageHeader = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
    <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
      <Link to="/" className="font-bold text-xl">
        {bijonConfig.personal.name.split(' ')[0]}
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="/#projects" className="hover:text-primary transition-colors">AI Projects</a>
        <Link to="/case-studies" className="hover:text-primary transition-colors">Case studies</Link>
        <a href="/#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
        <a href="/#contact" className="hover:text-primary transition-colors">Contact</a>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button size="sm" asChild>
          <a href={resumeHref} download={bijonConfig.navigation.resume.downloadName} aria-label="Download resume (PDF)">
            {bijonConfig.navigation.resume.label}
            <Download className="w-4 h-4 ml-1.5" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  </nav>
);

export default PageHeader;
