import { useState } from 'react'
import ArticleCard from './ArticleCard'
import { isMobile } from 'react-device-detect'
import Articles from '../../models/articles'

export default function ArticleList({
  title,
  articleData,
}: {
  title: string
  articleData: Articles.Article[] | undefined
}) {
  const [vivewAll, setViewAll] = useState(false)

  const maxCount = isMobile ? 3 : 4

  let articles = []
  if (articleData) {
    if (!vivewAll && articleData.length > maxCount) {
      //@ts-ignore
      articles = articleData.slice(0, maxCount)
    } else {
      //@ts-ignore
      articles = articleData
    }
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-between space-x-4">
          <h2 className="text-lg font-medium text-gray-500 dark:text-white">
            {title}
          </h2>
          {articleData && (
            <button
              onClick={() => setViewAll(!vivewAll)}
              className="whitespace-nowrap text-sm font-medium text-primary hover:text-primary-darker"
            >
              {vivewAll ? 'less' : 'View all'}
              <span aria-hidden="true"> &rarr;</span>
            </button>
          )}
        </div>
        <div className="mx-2 mt-6">
          {articles?.map((article: Articles.Article) => {
            return (
              <ArticleCard key={'article-' + article.url} article={article} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
