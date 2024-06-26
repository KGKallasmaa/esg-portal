import { WEBAPP_URL } from '../../../config/url'
import { makeRequest } from '../../../config/request'
import Institution from '../../../models/institutions'

async function getInstitution(id: string): Promise<Institution.Institution> {
  const path = `v1/institutions/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

export const InstitutionsClient = {
  getInstitution,
}
