import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import headerNavLinks from '@/data/headerNavLinks'
import Link from 'next/link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import LeftDarkGradient from './background/left-dark-gradient.svg'
import RightDarkGradient from './background/right-dark-gradient.svg'
import { Outfit } from 'next/font/google'

interface Props {
  children: ReactNode
}

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div className={`${outfit.variable} font-sans animate-in fade-in duration-700`}>
      <header className="flex items-center justify-end px-4 py-10 sm:justify-center sm:px-0">
        <div className="flex items-center text-base leading-7">
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="mb-auto rounded px-2 py-1 text-lg font-medium text-gray-800 hover:bg-gray-200 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 sm:p-4"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>
      <SectionContainer>
        <div className="min-w-1/2 flex h-screen flex-col justify-between">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
        <div className="fixed -bottom-11 -left-28 -z-10 h-full w-full opacity-60 sm:-bottom-0 sm:-left-64">
          <LeftDarkGradient />
        </div>
        <div className="fixed -top-96 right-64 -z-10 h-full w-full opacity-60 sm:-right-96">
          <RightDarkGradient />
        </div>
      </SectionContainer>
    </div>
  )
}

export default LayoutWrapper
