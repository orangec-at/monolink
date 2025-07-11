export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  categories: Category[];
  tags: Tag[];
  featuredImage?: Media;
  seo?: SEO;
}

export interface Author {
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar?: Media;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Media {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
}

export interface MediaFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: Media;
  keywords?: string;
  metaRobots?: string;
  structuredData?: any;
  metaViewport?: string;
  canonicalURL?: string;
}

export interface Page {
  id: number;
  title: string;
  content: string;
  slug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  seo?: SEO;
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  email: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
  post: Post;
  approved: boolean;
}

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

export interface SupabaseProfile {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}