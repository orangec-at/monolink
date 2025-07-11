import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const strapi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover?: {
    id: number;
    url: string;
    alternativeText?: string;
  };
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  author?: {
    id: number;
    name: string;
    email: string;
    avatar?: {
      id: number;
      url: string;
    };
  };
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  avatar?: {
    id: number;
    url: string;
  };
}

export const getStrapiURL = (path = '') => {
  return `${STRAPI_URL}${path}`;
};

export const getStrapiMedia = (url: string | null | undefined, options?: {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
}) => {
  if (!url) return null;
  
  // If it's already a full URL (including Cloudinary), return as is
  if (url.startsWith('http')) return url;
  
  // For relative URLs, prepend Strapi base URL
  return getStrapiURL(url);
};

export default strapi;