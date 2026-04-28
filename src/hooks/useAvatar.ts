import useSWR from 'swr';
import { getAvatar } from '@/lib/decapi';

export function useAvatar() {
  return useSWR('decapi:avatar', getAvatar, {
    refreshInterval: 30 * 60 * 1000,
    revalidateOnFocus: false,
  });
}
