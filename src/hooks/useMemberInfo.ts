import useSWR from 'swr';
import { getAvatarFor, getUptimeFor } from '@/lib/decapi';

export interface MemberInfo {
  avatar: string | null;
  online: boolean;
}

export function useMemberInfo(login: string) {
  return useSWR<MemberInfo>(
    `decapi:member:${login}`,
    async () => {
      const [avatar, uptime] = await Promise.all([
        getAvatarFor(login),
        getUptimeFor(login),
      ]);
      return { avatar, online: uptime.online };
    },
    {
      refreshInterval: 5 * 60 * 1000,
      revalidateOnFocus: false,
    },
  );
}
