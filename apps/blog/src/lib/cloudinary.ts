import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || 'demo',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'demo',
});

export interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export const getCloudinaryUrl = (publicId: string, options?: {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'scale' | 'fit' | 'pad';
}) => {
  const baseUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'}/image/upload`;
  
  const transformations = [];
  
  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.quality) transformations.push(`q_${options.quality}`);
  if (options?.format) transformations.push(`f_${options.format}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);
  
  const transformString = transformations.length > 0 ? `/${transformations.join(',')}` : '';
  
  return `${baseUrl}${transformString}/${publicId}`;
};

export const optimizeImageUrl = (url: string | null | undefined, options?: {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
}) => {
  if (!url) return null;
  
  // If it's already a Cloudinary URL, return as is
  if (url.includes('cloudinary.com')) return url;
  
  // If it's a Strapi URL, we'll use it as fallback
  if (url.startsWith('http')) return url;
  
  // For relative URLs, prepend Strapi base URL
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  return `${strapiUrl}${url}`;
};

export default cloudinary;