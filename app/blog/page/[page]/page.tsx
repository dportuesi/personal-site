import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayout'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export function generateStaticParams() {
  const totalPosts = allBlogs
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))
}

export default async function PostPage(props: { params: Promise<{ page: string }> }) {
  const { page } = await props.params
  const posts = sortedBlogPost(allBlogs)
  const allPosts = allCoreContent(posts)
  const pageNumber = parseInt(page)
  const initialDisplayPosts = allPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={allPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
