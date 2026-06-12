interface VimeoEmbedProps {
  src: string;
  title: string;
  className?: string;
}

const VimeoEmbed = ({ src, title, className = "" }: VimeoEmbedProps) => (
  <iframe
    width="100%"
    height="100%"
    src={src}
    title={title}
    frameBorder="0"
    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    className={`absolute inset-0 h-full w-full ${className}`.trim()}
  />
);

export default VimeoEmbed;
