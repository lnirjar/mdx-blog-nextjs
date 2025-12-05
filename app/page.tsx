import { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";

import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on web development, JavaScript, Next.js, and more.",
};

export default function Blog() {
  const blogPosts = getAllBlogPosts();

  return (
    <main className="px-4 sm:px-8 lg:px-16 space-y-6">
      <h1 className="text-4xl font-bold">Blog</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
        {blogPosts.map((blogPost) => (
          <BlogCard key={blogPost.slug} blogPost={blogPost} />
        ))}
      </div>
    </main>
  );
}
