interface Props {
  slug: string;
  title: string;
}

// Hosts known to serve this site. Twitch validates the iframe `parent`
// against the host bar; passing multiple `parent` params lets the embed
// work in dev (localhost), in Vercel previews, and in the production
// custom domain without rebuilding.
const KNOWN_HOSTS = ['vakeiro.live', 'www.vakeiro.live', 'localhost'];

function buildEmbedSrc(slug: string): string {
  const hosts = new Set<string>(KNOWN_HOSTS);
  if (typeof window !== 'undefined' && window.location.hostname) {
    hosts.add(window.location.hostname);
  }
  const parents = Array.from(hosts).map((h) => `parent=${h}`).join('&');
  return `https://clips.twitch.tv/embed?clip=${slug}&${parents}`;
}

export function ClipEmbed({ slug, title }: Props) {
  return (
    <div className="aspect-video w-full">
      <iframe
        src={buildEmbedSrc(slug)}
        title={title}
        loading="lazy"
        allowFullScreen
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    </div>
  );
}
