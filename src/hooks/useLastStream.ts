import useSWR from 'swr';
import { getLastStreamDate } from '@/lib/decapi';

export function useLastStream() {
  return useSWR('decapi:lastStream', getLastStreamDate, {
    refreshInterval: 5 * 60 * 1000,
    revalidateOnFocus: false,
  });
}
