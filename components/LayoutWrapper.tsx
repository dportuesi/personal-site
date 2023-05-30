import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className="fadeDivs min-w-1/2 flex h-screen flex-col justify-between animate-in fade-in duration-700">
        <header className="flex items-center justify-center py-10">
          <div className="flex items-center text-base leading-7">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="mb-auto text-lg font-medium text-gray-800 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400 sm:p-4 hover:bg-gray-200 rounded py-1 px-2"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
