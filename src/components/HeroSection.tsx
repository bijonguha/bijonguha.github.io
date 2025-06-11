
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { bijonConfig } from '@/config/bijonConfig';

const HeroSection = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    // Simulate loading animation
    const timer1 = setTimeout(() => {
      setCurrentText(bijonConfig.personal.heroAnimation.loadingText);
    }, 500);

    const timer2 = setTimeout(() => {
      setShowProgress(true);
    }, 1500);

    const timer3 = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Terminal-style loading animation */}
        <div className="mb-8 font-mono text-sm text-muted-foreground min-h-[3rem]">
          {currentText && (
            <div className="animate-fadeIn">
              {currentText}
              <span className="animate-pulse">|</span>
            </div>
          )}
          {showProgress && (
            <div className="mt-2 animate-fadeIn">
              {bijonConfig.personal.heroAnimation.progressText}
            </div>
          )}
        </div>

        {/* Main hero content */}
        <div className={`transition-all duration-1000 ${loadingComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            {bijonConfig.personal.name}
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            {bijonConfig.personal.title}
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            "{bijonConfig.personal.tagline}"
          </p>

          {/* Trust indicators */}
          <div className="mb-12">
            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
              Trusted by leaders at:
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {bijonConfig.companies.map((company, index) => (
                <div key={index} className="text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors">
                  {company}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              EXPLORE MY AI JOURNEY
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              VIEW LIVE DEMOS
            </Button>
          </div>
        </div>

        {/* Floating neural network visualization */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 opacity-20 hidden lg:block">
          <div className="w-32 h-32 relative">
            {/* Simplified neural network nodes */}
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-primary rounded-full animate-ping"></div>
            <div className="absolute top-8 left-4 w-3 h-3 bg-accent rounded-full animate-ping delay-300"></div>
            <div className="absolute top-8 right-4 w-3 h-3 bg-accent rounded-full animate-ping delay-600"></div>
            <div className="absolute bottom-8 left-4 w-3 h-3 bg-accent rounded-full animate-ping delay-900"></div>
            <div className="absolute bottom-8 right-4 w-3 h-3 bg-accent rounded-full animate-ping delay-1200"></div>
            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-primary rounded-full animate-ping delay-1500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
