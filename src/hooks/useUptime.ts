import useSWR from 'swr';
import { getUptime } from '@/lib/decapi';

export function useUptime() {
  return useSWR('decapi:uptime', getUptime, {
    refreshInterval: 60 * 1000,
    revalidateOnFocus: false,
  });
}
