import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import LinkedInIcon from 'components/social-buttons/linkedin.svg'
import GithubIcon from 'components/social-buttons/github.svg'
import EmailIcon from 'components/social-buttons/email.svg'
import ResumeIcon from 'components/social-buttons/resume.svg'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayoutIndex({ children, content }: Props) {
  const { name, occupation, company, email, linkedin, github, resume } = content

  return (
    <div>
      <div className="items-left flex flex-col gap-x-12">
        <div className="pt-6">
          <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Hi, I'm{' '}
            <span className="animate-text bg-gradient-to-r from-teal-500 via-blue-500 to-green-500 bg-clip-text font-black text-transparent">
              {name}
            </span>
          </h1>
          <h2 className="text-lg text-gray-600 dark:text-gray-400">
            {`Hey there! 👋 and welcome to my site - ${siteMetadata.description}!
            I am a `}
            {occupation}
            {` currently working at `}
            <Link className="underline decoration-blue-500" href="https://www.willowtreeapps.com">
              {company}
            </Link>
            {
              ' and I care deeply about design, development, and implementation of web and mobile products.'
            }
            <br />
            <br />
            {'Please check out my '}
            <Link className="underline decoration-blue-500" href="/projects">
              projects
            </Link>
            {' and '}
            <Link className="underline decoration-blue-500" href="/blog">
              blogging.
            </Link>
            <br />
            <br />
            {
              'As always, I am available for hire to create the high-quality website or mobile you deserve. Email me with the button below.'
            }
          </h2>
        </div>
        {
          // Havent decided if i want the subscribe box yet or not
        }
        {/* <div className="mx-2 my-12 flex w-96 items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="rounded-xl bg-zinc-100 p-6 px-2 py-1 dark:bg-gray-800 sm:px-14 sm:py-8">
              <NewsletterForm title="Stay updated, receive the latest post straight to your mailbox" />
            </div>
          </div>
        </div> */}
      </div>
      <div className="mt-6 flex flex-wrap gap-4 text-center xl:mb-6">
        <a
          className="focusable flex flex-none cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-500 px-2.5 py-2 font-medium text-white shadow-lg shadow-blue-500/10 transition selection:bg-white/30 hover:bg-blue-500/80 hover:shadow-blue-500/5 focus:ring-blue-500/40 dark:bg-blue-400 dark:text-zinc-900 dark:shadow-blue-400/10 dark:selection:bg-zinc-900/30 dark:hover:bg-blue-400/80 dark:hover:shadow-blue-400/5 dark:focus:ring-blue-400/40 sm:w-auto sm:px-3 sm:pl-2.5"
          href={linkedin}
          rel="noreferrer"
          target="_blank"
        >
          <LinkedInIcon />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>
        <a
          className="focusable flex flex-none cursor-pointer items-center justify-center gap-2 rounded-md bg-indigo-500 px-2.5 py-2 font-medium text-white shadow-lg shadow-indigo-500/10 transition selection:bg-white/30 hover:bg-indigo-500/80 hover:shadow-indigo-500/5 focus:ring-indigo-500/40 dark:bg-indigo-400 dark:text-zinc-900 dark:shadow-indigo-400/10 dark:selection:bg-zinc-900/30 dark:hover:bg-indigo-400/80 dark:hover:shadow-indigo-400/5 dark:focus:ring-indigo-400/40 sm:w-auto sm:px-3 sm:pl-2.5"
          href={github}
          rel="noreferrer"
          target="_blank"
        >
          <GithubIcon />
          <span className="hidden sm:inline">GitHub</span>
        </a>
        <a
          className="focusable flex flex-none cursor-pointer items-center justify-center gap-2 rounded-md bg-lime-500 px-2.5 py-2 font-medium text-white shadow-lg shadow-lime-500/10 transition selection:bg-white/30 hover:bg-lime-500/80 hover:shadow-lime-500/5 focus:ring-lime-500/40 dark:bg-lime-400 dark:text-zinc-900 dark:shadow-lime-400/10 dark:selection:bg-zinc-900/30 dark:hover:bg-lime-400/80 dark:hover:shadow-lime-400/5 dark:focus:ring-lime-400/40 sm:w-auto sm:px-3 sm:pl-2.5"
          href={`mailto:${email}`}
        >
          <EmailIcon />
          <span className="hidden sm:inline">Email</span>
        </a>
        <a
          className="focusable flex flex-none cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-500 px-2.5 py-2 font-medium text-white shadow-lg shadow-blue-500/10 transition selection:bg-white/30 hover:bg-blue-500/80 hover:shadow-blue-500/5 focus:ring-blue-500/40 dark:bg-blue-400 dark:text-zinc-900 dark:shadow-blue-400/10 dark:selection:bg-zinc-900/30 dark:hover:bg-blue-400/80 dark:hover:shadow-blue-400/5 dark:focus:ring-blue-400/40 sm:w-auto sm:px-3 sm:pl-2.5"
          href={resume}
          rel="noreferrer"
          target="_blank"
        >
          <ResumeIcon />
          <span className="hidden sm:inline">Resume</span>
        </a>
      </div>
    </div>
  )
}
