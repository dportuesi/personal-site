import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { InferGetStaticPropsType } from 'next'
import { allAuthors } from 'contentlayer/generated'
import Image from 'next/image'

const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps = async () => {
  const author = allAuthors.find((p) => p.slug === 'default')
  return { props: { author } }
}

const authorImage1 = '/static/images/about1.jpg'
const authorImage2 = '/static/images/about2.jpg'
const authorImage3 = '/static/images/about3.jpg'
const authorImage4 = '/static/images/about4.jpg'

export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="animate-in fade-in duration-500">
        <MDXLayoutRenderer layout={author.layout || DEFAULT_LAYOUT} content={author} />
      </div>
      <section className="container mx-auto p-10 px-0 py-20">
        <section className="grid grid-cols-1 gap-6 antialiased md:grid-cols-2 lg:grid-cols-4">
          <Image
            className="mx-auto rounded-md shadow-xl duration-500 hover:-translate-y-2"
            src={authorImage1}
            blurDataURL={authorImage1}
            placeholder="blur"
            alt=""
            width={445}
            height={629}
          />

          <Image
            className="mx-auto mt-0 rounded-md shadow-xl duration-500 hover:-translate-y-2 sm:mt-20"
            src={authorImage2}
            blurDataURL={authorImage2}
            placeholder="blur"
            alt=""
            width={445}
            height={629}
          />

          <Image
            className="mx-auto rounded-md shadow-xl duration-500 hover:-translate-y-2"
            src={authorImage3}
            blurDataURL={authorImage3}
            placeholder="blur"
            alt=""
            width={445}
            height={629}
          />
          <Image
            className="mx-auto mt-0 rounded-md shadow-xl duration-500 hover:-translate-y-2 sm:mt-20"
            src={authorImage4}
            blurDataURL={authorImage4}
            placeholder="blur"
            alt=""
            width={445}
            height={629}
          />
        </section>
      </section>
    </div>
  )
}
