import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { searchArticles } from "@/lib/api";
import { getStrapiMedia, Article } from "@/lib/strapi";
import SearchBox from "@/components/SearchBox";
import { Header } from "@/components/Header";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

function SearchResults({ query }: { query: string }) {
  return <SearchResultsContent query={query} />;
}

async function SearchResultsContent({ query }: { query: string }) {
  let articles: Article[] = [];
  let error = null;

  if (query) {
    try {
      articles = await searchArticles(query);
    } catch (err) {
      console.error("Search error:", err);
      error = "An error occurred while searching";
    }
  }

  return (
    <div className="mt-8">
      {query && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {articles.length > 0
              ? `Found ${articles.length} result${
                  articles.length === 1 ? "" : "s"
                } for "${query}"`
              : `No results found for "${query}"`}
          </h2>
          {error && (
            <p className="text-red-600 dark:text-red-400 mt-2">{error}</p>
          )}
        </div>
      )}

      {articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className=" dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 block hover:border-gray-300 dark:hover:border-gray-600"
            >
              {article.cover && (
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      getStrapiMedia(article.cover.url) || "/placeholder.jpg"
                    }
                    alt={article.cover.alternativeText || article.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  {article.author && <span>By {article.author.name}</span>}
                  {article.category && (
                    <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {article.category.name}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <time className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {query && articles.length === 0 && !error && (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            No articles found matching your search.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try different keywords or browse our latest articles.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query = "" } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Search Articles
          </h1>
          <SearchBox />
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  );
}
