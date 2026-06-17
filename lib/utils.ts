import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getVideoEmbedUrl(url: string | undefined, autoplay: boolean = false): string | null {
  if (!url) return null;

  try {
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      let videoId = '';
      if (url.includes('youtube.com/watch')) {
        videoId = new URL(url).searchParams.get('v') || '';
      } else {
        videoId = new URL(url).pathname.slice(1);
      }
      const base = videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      return base && autoplay ? `${base}?autoplay=1` : base;
    }

    if (url.includes('vimeo.com/')) {
      const parts = new URL(url).pathname.split('/').filter(Boolean);
      const videoId = parts[0];
      const base = videoId && !isNaN(Number(videoId)) ? `https://player.vimeo.com/video/${videoId}` : null;
      return base && autoplay ? `${base}?autoplay=1` : base;
    }

    return null;
  } catch (e) {
    return null;
  }
}

export function getVideoThumbnailUrl(url: string | undefined): string | null {
  if (!url) return null;

  try {
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      let videoId = '';
      if (url.includes('youtube.com/watch')) {
        videoId = new URL(url).searchParams.get('v') || '';
      } else {
        videoId = new URL(url).pathname.slice(1);
      }
      return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
    }

    if (url.includes('vimeo.com/')) {
      const parts = new URL(url).pathname.split('/').filter(Boolean);
      const videoId = parts[0];
      return videoId && !isNaN(Number(videoId)) ? `https://vumbnail.com/${videoId}.jpg` : null;
    }

    return null;
  } catch (e) {
    return null;
  }
}
