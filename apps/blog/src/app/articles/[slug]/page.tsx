import Image from "next/image";
import { getArticleBySlug, getArticles } from "@/lib/api";
import { getStrapiMedia } from "@/lib/strapi";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import Link from "next/link";
import Comments from "@/components/Comments";
import ArticleStats from "@/components/ArticleStats";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Enable ISR with 60 seconds revalidation
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const response = await getArticles({
      pagination: { pageSize: 100 }
    });
    
    return response.data.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-6">
            <div className="flex items-center space-x-4">
              {article.author && <span>By {article.author.name}</span>}
              <time>
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            {article.category && (
              <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
                {article.category.name}
              </span>
            )}
          </div>

          {article.description && (
            <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
              {article.description}
            </p>
          )}
        </div>

        {/* Cover Image */}
        {article.cover && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={getStrapiMedia(article.cover.url) || "/placeholder.jpg"}
              alt={article.cover.alternativeText || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Stats */}
        <ArticleStats articleSlug={article.slug} />

        {/* Content */}
        <div className=" dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.content ? (
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No content available for this article.
              </p>
            )}
          </div>
        </div>

        {/* Comments */}
        <Comments articleSlug={article.slug} />

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            ← Back to Blog
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Search Articles →
          </Link>
        </div>
      </div>
    </div>
  );
}
