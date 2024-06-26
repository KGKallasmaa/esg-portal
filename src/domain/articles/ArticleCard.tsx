import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline'
import Articles from '../../models/articles'
import { ShareButton } from '../../components/Share'
import Link from 'next/link'

const votingEnabled = false

const ArticleCard: React.FC<{ article: Articles.Article }> = ({ article }) => {
  const dateDiff =
    new Date(article.publishedAt).getTime() - new Date().getTime()
  const locale = navigator.language || 'en-US'
  const formatter = new Intl.RelativeTimeFormat(locale)
  const nrOfHoursSincePublish = formatter.format(
    Math.round(dateDiff / 3_600_000),
    'hours'
  )
  return (
    <div className="mb-3 border-b pb-3">
      <Link href={article.url} className="group flex items-center">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            className="mr-3 h-24 w-24 rounded-md object-cover"
          />
        ) : (
          <div className="mr-3 h-24 w-24 rounded-md object-cover" />
        )}
        <div className="flex-1">
          <h2 className="mb-2 text-lg font-bold leading-tight text-gray-500 group-hover:underline">
            {article.title}
          </h2>
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="clock"
              className="mr-1 h-3"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
              ></path>
            </svg>
            <span className="text-xs text-gray-500">
              {nrOfHoursSincePublish} | {article.authors}
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              {votingEnabled && (
                <button aria-label="Thumbs up" className="mr-2">
                  <HandThumbUpIcon className="h-6 w-6" />
                </button>
              )}
              {votingEnabled && (
                <button aria-label="Thumbs down" className="mr-2">
                  <HandThumbDownIcon className="h-6 w-6" />
                </button>
              )}
              <ShareButton url={article.url} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
export default ArticleCard
