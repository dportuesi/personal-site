import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <object>
      <Link
        href={`/tags/${kebabCase(text)}`}
        className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      >
        {text.split(' ').join('-')}
      </Link>
    </object>
  )
}

export default Tag
