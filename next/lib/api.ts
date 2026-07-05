const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    fetchedAt: string;
    server: string;
  };
}

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const result: ApiResponse<T> = await response.json();
  return result.data;
}

export interface BlogSummary {
  slug: string;
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
}

export interface BlogPost extends BlogSummary {
  content: string;
}

export async function fetchBlogs(): Promise<BlogSummary[]> {
  return fetchApi<BlogSummary[]>("/api/blogs");
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
  return fetchApi<BlogPost>(`/api/blog/${slug}`);
}