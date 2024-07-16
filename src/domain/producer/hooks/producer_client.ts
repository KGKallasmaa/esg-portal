import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Producer from '../../../models/producer'

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

async function putUpdateEmmisions(
  id: string,
  emmisions: {
    scope1_kgco2e: number
    scope2_kgco2e: number
    scope3_kgco2e: number
  }
): Promise<Producer.Producer> {
  const path = `v1/producers/${id}/emissions`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  const payload = {
    emissions: [
      {
        scope: 'scope1',
        value: {
          value: emmisions.scope1_kgco2e,
          unit: 'kg',
        },
      },
      {
        scope: 'scope2',
        value: {
          value: emmisions.scope2_kgco2e,
          unit: 'kg',
        },
      },
      {
        scope: 'scope3',
        value: {
          value: emmisions.scope3_kgco2e,
          unit: 'kg',
        },
      },
    ],
  }
  console.log('payload', payload)
  return await makeRequest(url, 'PUT', true, payload)
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
  putUpdateEmmisions,
  deleteProducer,
}
