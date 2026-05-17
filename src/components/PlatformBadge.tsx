import { Platform } from '../../shared/types';

interface PlatformBadgeProps {
  platform: Platform;
}

const platformConfig: Record<Platform, { name: string; color: string; bg: string }> = {
  jd: { name: '京东', color: '#e4393c', bg: '#fef2f2' },
  taobao: { name: '淘宝', color: '#ff5000', bg: '#fff7ed' },
  pinduoduo: { name: '拼多多', color: '#e02e24', bg: '#fef2f2' }
};

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const config = platformConfig[platform];
  return (
    <span 
      className="px-2 py-1 rounded-md text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.name}
    </span>
  );
}
