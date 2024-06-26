import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Portfolio from '../../../models/portfolio'
import Producer from '../../../models/producer'
import { PortfolioValueRequest } from './portfolio_requests'

async function getProducer(
  id:string
): Promise<Producer.Producer> {
  const path = `v1/producers/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function postCreateProducer(
    req:{
        url: string
    }
  ): Promise<Producer.Producer> {
    const path = `v1/producers`
    const url = new URL(`${WEBAPP_URL}/${path}`)
    return await makeRequest(url, 'GET', true,req)
  }

  async function putUpdateEmmisions(
    id:string,
    scope:string,
    value:number
  ): Promise<Producer.Producer> {
    const path = `v1/producers/${id}/emissions`
    const url = new URL(`${WEBAPP_URL}/${path}`)
    const payload = {
        "scope":scope,
        "value":{
            "value":value,
            "unit":"kg"
        }
    }
    return await makeRequest(url, 'PUT', true,payload)
  }

  async function deleteProducer(
    id:string
  ): Promise<null> {
    const path = `v1/producers/${id}`
    const url = new URL(`${WEBAPP_URL}/${path}`)
    return await makeRequest(url, 'DELETE', true)
  }
export const ProducerClient = {
  getProducer,
  postCreateProducer,
    putUpdateEmmisions,
  deleteProducer,
}
