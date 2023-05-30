import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import NewsletterForm from '@/components/NewsletterForm'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <>
      <div>
        <div className="flex flex-col items-center my-6 xl:flex-row gap-x-12 xl:mb-12">
          <div className="pt-6">
            <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Hi, I’m {name}
            </h1>
            <h2 className="text-lg prose text-gray-600 dark:text-gray-400">
              {`Welcome to my blog - ${siteMetadata.description}. I am the co-founder of Cylynx, a data
              scientist by profession and economist by training. In my free time, I like developing `}
              <Link href="/projects">side projects</Link>
              {' and '}
              <Link href="/blog">blogging</Link>
              {' about them. Have a good read!'}
            </h2>
          </div>
          <div className="flex items-center justify-center mx-2 my-12 w-96">
            <div className="flex items-center justify-center">
              <div className="p-6 bg-gray-100 dark:bg-gray-800 sm:px-14 sm:py-8 rounded py-1 px-2">
                <NewsletterForm title="Stay updated, receive the latest post straight to your mailbox" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
