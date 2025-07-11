import type { Post, Media } from '@monolink/types';

export function formatDate(dateString: string, locale: string = 'ko-KR'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateText(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export function getImageUrl(media?: Media, format: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'): string {
  if (!media) return '/placeholder-image.jpg';
  
  if (media.formats?.[format]) {
    return media.formats[format].url;
  }
  
  return media.url;
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function extractExcerpt(content: string, maxLength: number = 160): string {
  const strippedContent = content.replace(/<[^>]*>/g, '');
  return truncateText(strippedContent, maxLength);
}

export function buildStrapiUrl(path: string, baseUrl: string = process.env.STRAPI_API_URL || 'http://localhost:1337'): string {
  return `${baseUrl}/api${path}`;
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}