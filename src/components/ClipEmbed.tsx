interface Props {
  slug: string;
  title: string;
}

function getParent(): string {
  if (typeof window === 'undefined') return 'localhost';
  return window.location.hostname;
}

export function ClipEmbed({ slug, title }: Props) {
  const parent = getParent();
  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://clips.twitch.tv/embed?clip=${slug}&parent=${parent}`}
        title={title}
        loading="lazy"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    </div>
  );
}
