import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for dynamic data
export interface Comment {
  id: string;
  article_slug: string;
  author_name: string;
  author_email?: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Like {
  id: string;
  article_slug: string;
  user_id?: string;
  ip_address?: string;
  created_at: string;
}

export interface ViewCount {
  id: string;
  article_slug: string;
  views: number;
  updated_at: string;
}

// Comment functions
export async function getComments(articleSlug: string): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('article_slug', articleSlug)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function addComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at'>): Promise<Comment | null> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert([comment])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding comment:', error);
    return null;
  }
}

// Like functions
export async function getLikeCount(articleSlug: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('article_slug', articleSlug);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error fetching like count:', error);
    return 0;
  }
}

export async function addLike(articleSlug: string, userId?: string, ipAddress?: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('likes')
      .insert([{
        article_slug: articleSlug,
        user_id: userId,
        ip_address: ipAddress
      }]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error adding like:', error);
    return false;
  }
}

// View count functions
export async function getViewCount(articleSlug: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('view_counts')
      .select('views')
      .eq('article_slug', articleSlug)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return data?.views || 0;
  } catch (error) {
    console.error('Error fetching view count:', error);
    return 0;
  }
}

export async function incrementViewCount(articleSlug: string): Promise<number> {
  try {
    const { data, error } = await supabase.rpc('increment_view_count', {
      slug: articleSlug
    });

    if (error) throw error;
    return data || 0;
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return 0;
  }
}

export default supabase;