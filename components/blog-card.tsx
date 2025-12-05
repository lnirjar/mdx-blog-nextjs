import Link from "next/link";
import { format } from "date-fns";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  blogPost: BlogPost;
}

export const BlogCard = ({ blogPost }: BlogCardProps) => {
  const {
    frontMatter: { title, summary, publishedAt },
    slug,
  } = blogPost;
  return (
    <Link href={`/${slug}`} className="block h-full">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{summary}</CardDescription>
        </CardHeader>

        <CardFooter className="flex items-end flex-1">
          <p className="text-sm text-muted-foreground">
            {format(new Date(publishedAt), "MMMM d, yyyy")}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};
