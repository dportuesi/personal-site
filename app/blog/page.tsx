import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayout'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default function Blog() {
  const posts = sortedBlogPost(allBlogs)
  const allPosts = allCoreContent(posts)
  const initialDisplayPosts = allPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE),
  }

  return (
    <div className="animate-in fade-in duration-500">
      <ListLayout
        posts={allPosts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </div>
  )
}
