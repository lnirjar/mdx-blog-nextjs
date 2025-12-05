import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

type FrontMatter = {
  title: string;
  publishedAt: string;
  summary: string;
};

export type BlogPost = {
  frontMatter: FrontMatter;
  content: string;
  slug: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const getBlogSlugs = () => {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => path.extname(file) === ".mdx");

  const slugs = files.map((file) => file.replace(/\.mdx$/, ""));

  return slugs;
};

export const getBlogPostBySlug = (slug: string) => {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContents);

  return { frontMatter: data, content, slug } as BlogPost;
};

export const getAllBlogPosts = (): BlogPost[] => {
  const slugs = getBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .sort((a, b) =>
      a.frontMatter.publishedAt < b.frontMatter.publishedAt ? 1 : -1
    );

  return posts;
};
