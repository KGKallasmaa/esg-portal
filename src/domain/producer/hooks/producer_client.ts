import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Producer from '../../../models/producer'
import { UpdateProducerDetailsRequest } from './producer_requests'

async function getProducer(id: string): Promise<Producer.Producer> {
  const path = `v1/producers/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getMyProducers(): Promise<Producer.Producer[]> {
  const path = `v1/producers`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function postCreateProducer(req: {
  name: string
}): Promise<Producer.Producer> {
  const path = `v1/producers`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}

async function putUpdateDetails(
  id: string,
  req: UpdateProducerDetailsRequest
): Promise<Producer.Producer> {
  const path = `v1/producers/${id}/emissions`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, req)
}

async function deleteProducer(id: string): Promise<null> {
  const path = `v1/producers/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}
export const ProducerClient = {
  getProducer,
  getMyProducers,
  postCreateProducer,
  putUpdateDetails,
  deleteProducer,
}
