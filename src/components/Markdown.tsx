import { isValidElement, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MermaidDiagram from '@/components/MermaidDiagram';

const VIDEO = /\.(mp4|webm|mov)(\?.*)?$/i;

/**
 * Renders a case study body. Besides normal Markdown (headings, lists, tables,
 * code, quotes), an image whose path ends in .mp4/.webm plays as a video:
 *   ![Agent exploring the app](/media/content-intelligence/demo.mp4)
 * and a ```mermaid code block is drawn as a diagram.
 */
const Markdown = ({ children }: { children: string }) => (
  <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-primary prose-img:rounded-lg prose-img:border prose-code:before:content-none prose-code:after:content-none">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        img: ({ src = '', alt = '' }) =>
          VIDEO.test(src) ? (
            <span className="block my-6">
              <video src={src} controls playsInline preload="metadata" className="w-full rounded-lg border bg-black" aria-label={alt} />
              {alt && <span className="block mt-2 text-sm text-muted-foreground text-center">{alt}</span>}
            </span>
          ) : (
            <span className="block my-6">
              <img src={src} alt={alt} loading="lazy" className="w-full my-0" />
              {alt && <span className="block mt-2 text-sm text-muted-foreground text-center">{alt}</span>}
            </span>
          ),
        // Fenced ```mermaid blocks become diagrams; other code blocks render as usual.
        pre: ({ children: pre }) => {
          const child = isValidElement<{ className?: string; children?: ReactNode }>(pre) ? pre : null;
          if (child && /language-mermaid/.test(child.props.className ?? '')) {
            return <MermaidDiagram chart={String(child.props.children ?? '').replace(/\n$/, '')} />;
          }
          return <pre>{pre}</pre>;
        },
        a: ({ href = '', children: text }) => {
          const external = /^https?:\/\//.test(href);
          return (
            <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {text}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  </div>
);

export default Markdown;
