import strapi, { StrapiResponse, Article, Category, Author } from './strapi';

export async function getArticles(params?: {
  populate?: string[];
  sort?: string;
  filters?: any;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}): Promise<StrapiResponse<Article[]>> {
  const searchParams = new URLSearchParams();
  
  if (params?.populate && params.populate.length > 0) {
    params.populate.forEach(field => {
      searchParams.append('populate[]', field);
    });
  }
  
  if (params?.sort) {
    searchParams.append('sort[0]', params.sort);
  }
  
  if (params?.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      searchParams.append(`filters[${key}][$eq]`, value as string);
    });
  }
  
  if (params?.pagination?.page) {
    searchParams.append('pagination[page]', params.pagination.page.toString());
  }
  
  if (params?.pagination?.pageSize) {
    searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
  }
  
  const response = await strapi.get(`/articles?${searchParams.toString()}`);
  return response.data;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const response = await strapi.get(`/articles?filters[slug][$eq]=${slug}&populate=*`);
  const articles = response.data.data;
  return articles.length > 0 ? articles[0] : null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const response = await strapi.get(`/articles/${id}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function getCategories(): Promise<StrapiResponse<Category[]>> {
  const response = await strapi.get('/categories');
  return response.data;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const response = await strapi.get(`/categories?filters[slug][$eq]=${slug}`);
  const categories = response.data.data;
  return categories.length > 0 ? categories[0] : null;
}

export async function getAuthors(): Promise<StrapiResponse<Author[]>> {
  const response = await strapi.get('/authors?populate=avatar');
  return response.data;
}

export async function getAuthorById(id: string): Promise<Author | null> {
  try {
    const response = await strapi.get(`/authors/${id}?populate=avatar`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}

export async function getFeaturedArticles(limit = 5): Promise<Article[]> {
  const response = await getArticles({
    populate: ['cover', 'author', 'category'],
    sort: 'publishedAt:desc',
    pagination: { pageSize: limit }
  });
  return response.data;
}

export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  const response = await getArticles({
    populate: ['cover', 'author', 'category'],
    filters: {
      'category.slug': categorySlug
    },
    sort: 'publishedAt:desc'
  });
  return response.data;
}

export async function searchArticles(query: string): Promise<Article[]> {
  if (!query.trim()) {
    return [];
  }

  const searchParams = new URLSearchParams();
  searchParams.append('populate[]', 'cover');
  searchParams.append('populate[]', 'author');
  searchParams.append('populate[]', 'category');
  
  // Search in title, description, and content
  searchParams.append('filters[$or][0][title][$containsi]', query);
  searchParams.append('filters[$or][1][description][$containsi]', query);
  searchParams.append('filters[$or][2][content][$containsi]', query);
  
  searchParams.append('sort[0]', 'publishedAt:desc');
  searchParams.append('pagination[pageSize]', '20');

  try {
    const response = await strapi.get(`/articles?${searchParams.toString()}`);
    return response.data.data;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}