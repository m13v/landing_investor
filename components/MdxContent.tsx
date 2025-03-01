'use client'

import { MDXRemote } from 'next-mdx-remote'

export default function MdxContent({ source }: { source: any }) {
  return <MDXRemote {...source} />
}