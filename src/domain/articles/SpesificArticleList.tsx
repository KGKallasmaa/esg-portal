import ArticleList from './ArticleList'
import {
  useGetMyStockPortfolioArticles,
  useGetTopArticles,
} from './hooks/articles_hooks'

export function TopArticleList() {
  const title = 'Latest news'
  const { data } = useGetTopArticles()
  return <ArticleList title={title} articleData={data} />
}

export function StockArticleList() {
  const title = 'Latest news (fake)'
  const { data } = useGetMyStockPortfolioArticles()
  return <ArticleList title={title} articleData={data} />
}
