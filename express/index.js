const express = require("express");
const path = require("path");
const { blogPosts } = require("./data");

const app = express();
const PORT = 3001;

// Text endpoint
app.get("/text", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /text called`);
  console.log(`User-Agent: ${req.get("user-agent")}`);
  res.json({ message: "Hello, this is plain text!" });
});

// Image endpoint - serves a simple PNG image
app.get("/images/:name", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /images called`);
  console.log(`User-Agent: ${req.get("user-agent")}`);

  const { name } = req.params;
  const imagePath = path.join(__dirname, name);
  res.sendFile(imagePath);
});

// Blog list endpoint - returns all blog posts
app.get("/api/blogs", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/blogs called`);
  console.log(`User-Agent: ${req.get("user-agent")}`);

  const posts = Object.entries(blogPosts).map(([slug, post]) => ({
    slug,
    id: post.id,
    title: post.title,
    author: post.author,
    date: post.date,
    category: post.category,
  }));

  res.json({
    success: true,
    data: posts,
    meta: {
      fetchedAt: new Date().toISOString(),
      server: "Express API",
    },
  });
});

// Blog data endpoint - returns blog post content and headers
app.get("/api/blog/:slug", (req, res) => {
  const { slug } = req.params;

  console.log(`[${new Date().toISOString()}] GET /api/blog called with slug: ${slug}`);
  console.log(`User-Agent: ${req.get("user-agent")}`);

  const post = blogPosts[slug];

  if (!post) {
    return res.status(404).json({ error: "Blog post not found" });
  }

  res.json({
    success: true,
    data: post,
    meta: {
      fetchedAt: new Date().toISOString(),
      server: "Express API",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Text endpoint: http://localhost:${PORT}/text`);
  console.log(`Image endpoint: http://localhost:${PORT}/images/:name`);
  console.log(`Blog list endpoint: http://localhost:${PORT}/api/blogs`);
  console.log(`Blog API endpoint: http://localhost:${PORT}/api/blog/:slug`);
});
