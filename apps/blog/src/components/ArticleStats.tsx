'use client';

import { useState, useEffect } from 'react';
import { getLikeCount, addLike, getViewCount, incrementViewCount } from '@/lib/supabase';

interface ArticleStatsProps {
  articleSlug: string;
}

export default function ArticleStats({ articleSlug }: ArticleStatsProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
    incrementViews();
  }, [articleSlug]);

  const loadStats = async () => {
    setIsLoading(true);
    const [likes, views] = await Promise.all([
      getLikeCount(articleSlug),
      getViewCount(articleSlug)
    ]);
    
    setLikeCount(likes);
    setViewCount(views);
    
    // Check if user has already liked (using localStorage for demo)
    const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
    setHasLiked(likedArticles.includes(articleSlug));
    
    setIsLoading(false);
  };

  const incrementViews = async () => {
    const newViewCount = await incrementViewCount(articleSlug);
    if (newViewCount > 0) {
      setViewCount(newViewCount);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;

    const success = await addLike(articleSlug, undefined, 'demo-ip');
    if (success) {
      setLikeCount(prev => prev + 1);
      setHasLiked(true);
      
      // Store in localStorage for demo
      const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]');
      likedArticles.push(articleSlug);
      localStorage.setItem('likedArticles', JSON.stringify(likedArticles));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-6 py-4">
        <div className="animate-pulse flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="animate-pulse flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-6 py-4 border-b border-gray-200 dark:border-gray-700">
      {/* Like Button */}
      <button
        onClick={handleLike}
        disabled={hasLiked}
        className={`flex items-center space-x-2 transition-colors ${
          hasLiked
            ? 'text-red-500 cursor-default'
            : 'text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
        }`}
      >
        <svg
          className="w-6 h-6"
          fill={hasLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="text-sm font-medium">{likeCount}</span>
      </button>

      {/* View Count */}
      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span className="text-sm font-medium">{viewCount}</span>
      </div>
    </div>
  );
}