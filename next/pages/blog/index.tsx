import Head from "next/head";
import Link from "next/link";
import { fetchBlogs, BlogSummary } from "@/lib/api";

interface Props {
  posts: BlogSummary[];
}

export async function getStaticProps() {
  try {
    const posts = await fetchBlogs();

    return {
      props: { posts },
    };
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return {
      props: { posts: [] },
      notFound: true,
    };
  }
}

export default function BlogIndex({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Blog - All Posts</title>
        <meta name="description" content="Read our latest blog posts" />
      </Head>
      <div style={{ padding: "20px", maxWidth: "800px" }}>
        <h1>Blog Posts</h1>

        <article style={{ lineHeight: "1.6" }}>
          <p>
            Welcome to our blog. Here you&apos;ll find articles about web development, Next.js, and static site
            generation.
          </p>
        </article>

        <section style={{ marginTop: "40px" }}>
          <h2>Latest Posts</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {posts.map((post) => (
              <li
                key={post.slug}
                style={{
                  marginBottom: "24px",
                  paddingBottom: "24px",
                  borderBottom: "1px solid #eee",
                }}
              >
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <h3 style={{ margin: "0 0 8px 0", color: "#0070f3" }}>{post.title}</h3>
                </Link>
                <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                  <span>By {post.author}</span>
                  {" • "}
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  {post.category && (
                    <>
                      {" • "}
                      <span style={{ background: "#f0f0f0", padding: "2px 8px", borderRadius: "4px" }}>
                        {post.category}
                      </span>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <footer style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "20px" }}>
          <Link href="/">← Back to Home</Link>
        </footer>
      </div>
    </>
  );
}
