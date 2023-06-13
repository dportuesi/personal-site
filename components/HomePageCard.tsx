import Image from './Image'
import Link from './Link'

const CARD_IMAGE_WIDTH = 544
const CARD_IMAGE_HEIGHT = 306

const HomePageCard = ({ title, description, imgSrc, href, tools }) => (
  <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
    <div
      className={`${
        imgSrc && 'h-full'
      }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 transition duration-100 hover:scale-105 hover:rounded-xl hover:bg-zinc-200 dark:border-gray-700 dark:hover:bg-gray-800`}
    >
      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-56 lg:h-72"
              placeholder="blur"
              blurDataURL={imgSrc}
              width={CARD_IMAGE_WIDTH}
              height={CARD_IMAGE_HEIGHT}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-56 lg:h-72"
            placeholder="blur"
            blurDataURL={imgSrc}
            width={CARD_IMAGE_WIDTH}
            height={CARD_IMAGE_HEIGHT}
          />
        ))}

      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        <div className="mb-6 mt-4 flex flex-wrap items-center gap-3">
          {tools.map((tool, index) => {
            return (
              <span
                key={`${tool}-${index}`}
                className="rounded-md bg-blue-500 px-2 py-1 text-base font-medium text-white shadow-lg shadow-blue-500/10"
              >
                {tool}
              </span>
            )
          })}
        </div>
        {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )}
      </div>
    </div>
  </div>
)

export default HomePageCard
