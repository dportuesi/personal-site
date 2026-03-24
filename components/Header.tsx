import headerNavLinks from '@/data/headerNavLinks'
import Link from 'next/link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  return (
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
  )
}

export default Header
