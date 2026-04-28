const BASE = 'https://decapi.me/twitch';
const USER = 'vakeiroo';

export class DecapiError extends Error {}

async function fetchText(endpoint: string): Promise<string> {
  const res = await fetch(`${BASE}/${endpoint}/${USER}`, {
    headers: { Accept: 'text/plain' },
  });
  if (!res.ok) throw new DecapiError(`HTTP ${res.status} on ${endpoint}`);
  return (await res.text()).trim();
}

export async function getAvatar(): Promise<string> {
  return fetchText('avatar');
}

export interface UptimeResult {
  online: boolean;
  uptime: string | null;
}

export async function getUptime(): Promise<UptimeResult> {
  const text = await fetchText('uptime');
  const offline = /offline|not.*live|nunca/i.test(text);
  return { online: !offline, uptime: offline ? null : text };
}

export async function getFollowers(): Promise<number> {
  const text = await fetchText('followcount');
  const n = parseInt(text.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
}

export async function getTitle(): Promise<string> {
  return fetchText('title');
}

export async function getLastGame(): Promise<string> {
  return fetchText('lastgame');
}

/**
 * Decapi may not expose `last_stream` for all channels.
 * If the endpoint fails or returns an error string, callers fall back
 * to a hardcoded ISO date in `data/conquistas.ts`.
 */
export async function getLastStreamDate(): Promise<string | null> {
  try {
    const text = await fetchText('last_stream');
    if (/error|not\s*found|nunca/i.test(text)) return null;
    return text;
  } catch {
    return null;
  }
}
