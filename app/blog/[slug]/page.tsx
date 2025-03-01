import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import MdxContent from '@/components/MdxContent'

interface BlogPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  // Reads the MDX files in the blog folder
  const postsDir = path.join(process.cwd(), 'content', 'blog');
  
  // Add a check to handle the case when directory doesn't exist
  if (!fs.existsSync(postsDir)) {
    return [];
  }
  
  const filenames = fs.readdirSync(postsDir).filter((name) => name.endsWith('.mdx'));
  
  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, '')
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;
  
  // Print debug information
  console.log(`Attempting to render blog post with slug: ${slug}`);
  console.log(`Current working directory: ${process.cwd()}`);
  
  const postPath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`);
  console.log(`Looking for blog post at path: ${postPath}`);
  
  if (!fs.existsSync(postPath)) {
    console.error(`Blog post not found at path: ${postPath}`);
    notFound();
  }
  
  try {
    const fileContents = fs.readFileSync(postPath, 'utf8');
    const { content, data } = matter(fileContents);
    
    // Use the correct options for server components
    const mdxSource = await serialize(content, { 
      scope: data,
      mdxOptions: {
        development: process.env.NODE_ENV === 'development',
      }
    });
    
    return (
      <article className="prose prose-neutral dark:prose-invert mx-auto py-8">
        <h1>{data.title}</h1>
        <MdxContent source={mdxSource} />
      </article>
    );
  } catch (error) {
    console.error(`Error processing blog post: ${error}`);
    return (
      <div className="mx-auto py-8">
        <h1>Error loading blog post</h1>
        <p>There was an error loading this content. Please try again later.</p>
      </div>
    );
  }
}