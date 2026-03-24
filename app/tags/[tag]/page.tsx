import { Metadata } from 'next'
import { allBlogs } from 'contentlayer/generated'
import ListLayout from '@/layouts/ListLayout'
import kebabCase from '@/lib/utils/kebabCase'
import { getAllTags, allCoreContent } from '@/lib/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'

export async function generateStaticParams() {
  const tags = await getAllTags(allBlogs)
  return Object.keys(tags).map((tag) => ({ tag }))
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag } = await props.params
  return {
    title: tag,
    description: `${tag} tags - ${siteMetadata.author}`,
  }
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const { tag } = await props.params
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const filteredPosts = allCoreContent(
    allBlogs.filter(
      (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
    )
  )

  return <ListLayout posts={filteredPosts} title={title} />
}
