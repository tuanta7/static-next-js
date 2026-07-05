import Head from "next/head";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { fetchBlogs, fetchBlogPost, BlogPost } from "@/lib/api";

interface Props {
  post: BlogPost;
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const blogs = await fetchBlogs();
    const paths = blogs.map((post) => ({
      params: { slug: [post.slug] },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Failed to fetch blog paths:", error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  try {
    const slug = params?.slug;

    if (!slug || slug.length === 0) {
      return { notFound: true };
    }

    const postSlug = Array.isArray(slug) ? slug.join("/") : slug;
    const post = await fetchBlogPost(postSlug);

    return {
      props: { post },
    };
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return { notFound: true };
  }
};

export default function BlogPage({ post }: Props) {
  return (
    <>
      <Head>
        <title>{post.title} - Blog</title>
        <meta name="description" content={post.content.substring(0, 150)} />
      </Head>
      <div style={{ padding: "20px", maxWidth: "800px" }}>
        <header>
          <h1>{post.title}</h1>
          <div style={{ color: "#666", marginBottom: "20px" }}>
            <span>By {post.author}</span>
            {" | "}
            <span>{new Date(post.date).toLocaleDateString()}</span>
            {post.category && (
              <>
                {" | "}
                <span>{post.category}</span>
              </>
            )}
          </div>
        </header>

        <article style={{ lineHeight: "1.6" }}>
          <p>{post.content}</p>
        </article>

        <footer style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
          <Link href="/blog">← Back to Blog</Link>
        </footer>
      </div>
    </>
  );
}
