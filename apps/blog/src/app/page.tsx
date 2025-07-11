import Image from "next/image";
import Link from "next/link";
import { getFeaturedArticles } from "@/lib/api";
import { getStrapiMedia, Article } from "@/lib/strapi";
import SearchBox from "@/components/SearchBox";
import { Header } from "@/components/Header";

export default async function Home() {
  let articles: Article[] = [];

  try {
    articles = await getFeaturedArticles(3);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Welcome to Our Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Discover amazing articles powered by Strapi CMS
          </p>
          <SearchBox />
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 block hover:border-gray-300 dark:hover:border-gray-600"
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
                  <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {article.title}
                  </h2>
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
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-300">
              No articles available. Make sure Strapi is running and has some
              content.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
