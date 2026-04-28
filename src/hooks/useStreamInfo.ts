import useSWR from 'swr';
import { getTitle, getLastGame } from '@/lib/decapi';

export function useStreamInfo() {
  return useSWR(
    'decapi:streamInfo',
    async () => {
      const [title, lastGame] = await Promise.all([getTitle(), getLastGame()]);
      return { title, lastGame };
    },
    { refreshInterval: 5 * 60 * 1000, revalidateOnFocus: false }
  );
}
