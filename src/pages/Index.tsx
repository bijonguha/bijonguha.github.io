
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ProjectsSection from '@/components/ProjectsSection';
import WritingSection from '@/components/WritingSection';
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Mail, Github, Menu, X, Download } from 'lucide-react';
import { bijonConfig } from '@/config/bijonConfig';
import LinkedInIcon from '@/components/icons/LinkedInIcon';

const resumeHref = `${import.meta.env.BASE_URL}${bijonConfig.navigation.resume.file}`;

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Arriving from another page via a link like "/#projects": scroll to that section.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 100);
    return () => window.clearTimeout(t);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-bold text-xl">
            {bijonConfig.personal.name.split(' ')[0]}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {bijonConfig.navigation.links.map((link) =>
              link.href.startsWith('/') ? (
                <Link key={link.href} to={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ) : (
                <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </a>
              )
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button size="sm" className="hidden md:inline-flex" asChild>
              <a
                href={resumeHref}
                download={bijonConfig.navigation.resume.downloadName}
                aria-label="Download resume (PDF)"
              >
                {bijonConfig.navigation.resume.label}
                <Download className="w-4 h-4 ml-1.5" aria-hidden="true" />
              </a>
            </Button>

            {/* Mobile Hamburger Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t">
            <div className="container mx-auto px-6 py-4 space-y-4">
              {bijonConfig.navigation.links.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block text-lg font-medium hover:text-primary transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-lg font-medium hover:text-primary transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </a>
                )
              )}
              <Button size="sm" className="w-full mt-4" asChild>
                <a
                  href={resumeHref}
                  download={bijonConfig.navigation.resume.downloadName}
                  onClick={closeMobileMenu}
                >
                  Download resume (PDF)
                  <Download className="w-4 h-4 ml-1.5" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Sections */}
      <div id="home">
        <HeroSection />
      </div>
      
      <div id="projects">
        <ProjectsSection />
      </div>
      
      <div id="writing">
        <WritingSection />
      </div>
      
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Build the Future of AI Together
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Ready to transform your AI vision into production-ready systems? Let's discuss your next breakthrough.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={() => {
                window.location.href = `mailto:${bijonConfig.contact.email}?subject=AI Challenge Discussion&body=Hi Bijon, I'd like to discuss my AI challenge with you.`;
              }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Email me
            </Button>
          </div>

          <div className="flex justify-center gap-6">
            <a 
              href={`https://${bijonConfig.contact.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <LinkedInIcon className="w-6 h-6" />
            </a>
            <a 
              href={`https://${bijonConfig.contact.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href={`mailto:${bijonConfig.contact.email}`} 
              aria-label="Email"
              className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted/30 border-t">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} {bijonConfig.personal.name}. Building AI systems from first principles to production scale.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {bijonConfig.seo.metaDescription}
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Index;
