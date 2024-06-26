import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Articles from '../../../models/articles'

async function getTopArticles(): Promise<Articles.Article[]> {
  const path = `v1/articles/top`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

export const ArticlesClient = {
  getTopArticles,
}
