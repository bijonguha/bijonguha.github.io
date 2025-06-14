import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const FloatingThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed top-[12px] right-16 md:right-6 z-[60]">
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="
          h-12 w-12 rounded-full 
          bg-background/80 backdrop-blur-md 
          border-2 border-primary/20 
          hover:border-primary/40 
          hover:bg-background/90
          shadow-lg hover:shadow-xl 
          transition-all duration-300 ease-in-out
          hover:scale-105 active:scale-95
          group
        "
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <div className="relative">
          <Sun 
            className={`
              h-5 w-5 transition-all duration-300 ease-in-out
              ${theme === "light" 
                ? "rotate-0 scale-100 opacity-100" 
                : "rotate-90 scale-0 opacity-0"
              }
              absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              text-amber-500 group-hover:text-amber-400
            `} 
          />
          <Moon 
            className={`
              h-5 w-5 transition-all duration-300 ease-in-out
              ${theme === "dark" 
                ? "rotate-0 scale-100 opacity-100" 
                : "-rotate-90 scale-0 opacity-0"
              }
              absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              text-blue-400 group-hover:text-blue-300
            `} 
          />
        </div>
      </Button>
    </div>
  );
};

export default FloatingThemeToggle;