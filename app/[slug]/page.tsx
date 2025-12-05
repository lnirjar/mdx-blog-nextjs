import { Metadata } from "next";
import { format } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import readingTime from "reading-time";

import { MdxLink } from "@/components/mdx-link";
import { MdxImage } from "@/components/mdx-image";

import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blogPost = getBlogPostBySlug(slug);
  const {
    frontMatter: { title, summary },
  } = blogPost;

  return {
    title: `${title} | Blog`,
    description: summary,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogPost = getBlogPostBySlug(slug);
  const {
    frontMatter: { title, publishedAt },
    content,
  } = blogPost;

  const { text: readTime } = readingTime(content);

  return (
    <main className="px-4 sm:px-8 lg:px-16 space-y-6">
      <article className="prose dark:prose-invert lg:prose-xl prose-pre:px-0">
        <h1>{title}</h1>
        <div className="text-sm text-muted-foreground flex gap-2">
          <span>{format(new Date(publishedAt), "MMMM d, yyyy")}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <MDXRemote
          source={content}
          components={{ a: MdxLink, img: MdxImage }}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [
                  rehypePrettyCode,
                  {
                    theme: {
                      dark: "github-dark",
                      light: "one-light",
                    },
                  },
                ],
              ],
            },
          }}
        />
      </article>
    </main>
  );
}
