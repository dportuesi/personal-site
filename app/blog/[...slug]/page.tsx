import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import { sortedBlogPost, coreContent } from '@/lib/utils/contentlayer'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'

const DEFAULT_LAYOUT = 'PostLayout'

export function generateStaticParams() {
  return allBlogs.map((p) => ({
    slug: p.slug.split('/'),
  }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const slugStr = slug.join('/')
  const post = allBlogs.find((p) => p.slug === slugStr)
  if (!post) return {}

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const images = post.images || [siteMetadata.socialBanner]
  const imageList = typeof images === 'string' ? [images] : images
  const ogImages = imageList.map((img) => ({
    url: img.includes('http') ? img : `${siteMetadata.siteUrl}${img}`,
  }))

  const authorList = (post.authors || ['default']).map((author) => {
    const authorResult = allAuthors.find((p) => p.slug === author)
    return authorResult?.name || siteMetadata.author
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: siteMetadata.locale,
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authorList,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: ogImages,
    },
  }
}

export default async function BlogPost(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params
  const slugStr = slug.join('/')
  const sortedPosts = sortedBlogPost(allBlogs)
  const postIndex = sortedPosts.findIndex((p) => p.slug === slugStr)

  if (postIndex === -1) {
    return notFound()
  }

  const post = sortedPosts[postIndex]
  const prevContent = sortedPosts[postIndex + 1] || null
  const prev = prevContent ? coreContent(prevContent) : null
  const nextContent = sortedPosts[postIndex - 1] || null
  const next = nextContent ? coreContent(nextContent) : null
  const authorList = post.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults)
  })

  return (
    <>
      {'draft' in post && post.draft !== true ? (
        <MDXLayoutRenderer
          layout={post.layout || DEFAULT_LAYOUT}
          toc={post.toc}
          content={post}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
