import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getVideoEmbedUrl(url: string | undefined, autoplay: boolean = false, preview: boolean = false): string | null {
  if (!url) return null;

  try {
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      let videoId = '';
      if (url.includes('youtube.com/watch')) {
        videoId = new URL(url).searchParams.get('v') || '';
      } else {
        videoId = new URL(url).pathname.slice(1);
      }
      const base = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
      if (!base) return null;
      const params = new URLSearchParams();
      params.set('playsinline', '1');
      params.set('enablejsapi', '1');
      params.set('rel', '0');
      params.set('iv_load_policy', '3');
      params.set('cc_load_policy', '3'); // Undocumented YouTube trick to force CC off
      params.set('cc_lang_pref', 'zz');  // Invalid language to prevent loading a CC track
      if (autoplay || preview) params.set('autoplay', '1');
      if (preview) {
        params.set('mute', '1');
        params.set('controls', '0');
        params.set('modestbranding', '1');
        params.set('loop', '1');
        params.set('playlist', videoId);
      }
      const qs = params.toString();
      return qs ? `${base}?${qs}` : base;
    }

    if (url.includes('vimeo.com/')) {
      const urlObj = new URL(url);
      const parts = urlObj.pathname.split('/').filter(Boolean);
      const videoId = parts[0];
      const hash = parts[1]; // unlisted video hash

      if (videoId && !isNaN(Number(videoId))) {
        let base = `https://player.vimeo.com/video/${videoId}`;
        const params = new URLSearchParams();
        params.set('playsinline', '1');
        params.set('api', '1');
        params.set('texttrack', 'false');
        if (hash) params.set('h', hash);
        if (autoplay || preview) params.set('autoplay', '1');
        if (preview) {
          params.set('muted', '1');
          params.set('controls', '0');
          params.set('title', '0');
          params.set('byline', '0');
          params.set('portrait', '0');
          params.set('autopause', '0');
          params.set('background', '1');
          params.set('loop', '1');
        }
        
        const qs = params.toString();
        return qs ? `${base}?${qs}` : base;
      }
      return null;
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
      return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
    }

    if (url.includes('vimeo.com/')) {
      const parts = new URL(url).pathname.split('/').filter(Boolean);
      const videoId = parts[0];
      const hash = parts[1];
      // Vumbnail does not support unlisted Vimeo videos (with a hash in the URL).
      if (hash) return null;
      return videoId && !isNaN(Number(videoId)) ? `https://vumbnail.com/${videoId}.jpg` : null;
    }

    return null;
  } catch (e) {
    return null;
  }
}
