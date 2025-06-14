
import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExpertiseSection from '@/components/ExpertiseSection';
import FloatingThemeToggle from '@/components/FloatingThemeToggle';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, Github, ExternalLink, Menu, X } from 'lucide-react';
import { bijonConfig } from '@/config/bijonConfig';

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            {bijonConfig.navigation.links.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <Button 
            size="sm" 
            className="hidden md:block"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {bijonConfig.navigation.ctaButton.label}
          </Button>

          {/* Mobile Hamburger Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t">
            <div className="container mx-auto px-6 py-4 space-y-4">
              {bijonConfig.navigation.links.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="block text-lg font-medium hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </a>
              ))}
              <Button 
                size="sm" 
                className="w-full mt-4"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                  closeMobileMenu();
                }}
              >
                {bijonConfig.navigation.ctaButton.label}
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
      
      <div id="expertise">
        <ExpertiseSection />
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
              Discuss Your AI Challenge
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={() => {
                window.open(bijonConfig.heroButtons.secondary.url, '_blank');
              }}
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              {bijonConfig.heroButtons.secondary.label}
            </Button>
          </div>

          <div className="flex justify-center gap-6">
            <a 
              href={`https://${bijonConfig.contact.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href={`https://${bijonConfig.contact.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href={`mailto:${bijonConfig.contact.email}`} 
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
            © 2024 {bijonConfig.personal.name}. Building AI systems from first principles to production scale.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {bijonConfig.seo.metaDescription}
          </p>
        </div>
      </footer>

      {/* Floating Theme Toggle */}
      <FloatingThemeToggle />
    </div>
  );
};

export default Index;
