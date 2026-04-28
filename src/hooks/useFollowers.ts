import useSWR from 'swr';
import { getFollowers } from '@/lib/decapi';

export function useFollowers() {
  return useSWR('decapi:followers', getFollowers, {
    refreshInterval: 5 * 60 * 1000,
    revalidateOnFocus: false,
  });
}
