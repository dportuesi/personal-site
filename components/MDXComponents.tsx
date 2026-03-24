'use client'

/* eslint-disable react/display-name */
import React from 'react'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import type { MDXComponents as ComponentMap } from 'mdx/types'
import { coreContent } from '@/lib/utils/contentlayer'
import Image from './Image'
import CustomLink from './Link'
import TOCInline from './TOCInline'
import Pre from './Pre'
import type { Blog, Authors } from 'contentlayer/generated'

import PostLayout from '@/layouts/PostLayout'
import PostSimple from '@/layouts/PostSimple'
import AuthorLayout from '@/layouts/AuthorLayout'
import AuthorLayoutIndex from '@/layouts/AuthorLayoutIndex'
import ListLayout from '@/layouts/ListLayout'

const layouts = {
  PostLayout,
  PostSimple,
  AuthorLayout,
  AuthorLayoutIndex,
  ListLayout,
}

interface MDXLayout {
  layout: string
  content: Blog | Authors
  [key: string]: unknown
}

const Wrapper = ({ layout, content, ...rest }: MDXLayout) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Layout = layouts[layout as keyof typeof layouts] as React.ComponentType<any>
  if (!Layout) {
    throw new Error(`Unknown layout: ${layout}`)
  }
  return <Layout content={content} {...rest} />
}

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
}

export const MDXLayoutRenderer = ({ layout, content, ...rest }: MDXLayout) => {
  const MDXLayout = useMDXComponent(content.body.code)
  const mainContent = coreContent(content)

  return <MDXLayout layout={layout} content={mainContent} components={MDXComponents} {...rest} />
}
