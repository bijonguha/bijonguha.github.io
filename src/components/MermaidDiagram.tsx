import { useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

// Mermaid can only draw one diagram at a time, so renders are queued.
let queue: Promise<unknown> = Promise.resolve();
const enqueue = <T,>(job: () => Promise<T>): Promise<T> => {
  const run = queue.then(job, job);
  queue = run.catch(() => undefined);
  return run;
};

/**
 * Renders a ```mermaid code block from a post as a diagram that follows the
 * site's light/dark theme. Mermaid is loaded only on pages that have a diagram.
 */
const MermaidDiagram = ({ chart }: { chart: string }) => {
  const { resolvedTheme } = useTheme();
  const id = `mermaid-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { svg: out } = await enqueue(async () => {
          const { default: mermaid } = await import('mermaid');
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'strict',
            theme: resolvedTheme === 'dark' ? 'dark' : 'neutral',
            fontFamily: 'inherit',
            // Bars and lines in charts use the site's blue instead of the theme's pale default.
            themeVariables: { xyChart: { plotColorPalette: '#3b82f6, #f59e0b, #10b981, #8b5cf6' } },
          });
          return mermaid.render(`${id}-${resolvedTheme ?? 'light'}`, chart);
        });
        if (!cancelled) {
          setSvg(out);
          setError('');
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme, id]);

  if (error) {
    // Show the source so the post still makes sense; the message helps while writing.
    return (
      <div className="not-prose my-6 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
        <p className="font-medium mb-2">This diagram couldn't be drawn.</p>
        {import.meta.env.DEV && <p className="mb-2 text-muted-foreground">{error}</p>}
        <pre className="overflow-x-auto whitespace-pre text-xs">{chart}</pre>
      </div>
    );
  }

  return (
    <div
      className="not-prose my-6 flex justify-center overflow-x-auto rounded-lg border bg-card p-4 [&_svg]:max-w-full [&_svg]:h-auto"
      role="img"
      aria-label="Diagram"
      // Mermaid output in strict security mode is sanitised SVG.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
