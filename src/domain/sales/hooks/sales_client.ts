import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Sales from '../../../models/sales'
import { NewSalesRequest, UpdateSalesRequest } from './sales_requests'

async function getSaleByProductId(productId: string): Promise<Sales.Sale> {
  const path = `v1/sales/product/${productId}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function postNewSale(req: NewSalesRequest): Promise<Sales.Sale> {
  const path = `v1/sales`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}

async function putUpdateSale(
  id: string,
  req: UpdateSalesRequest
): Promise<Sales.Sale> {
  const path = `v1/sales/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, req)
}

async function deleteSale(id: string): Promise<Sales.Sale> {
  const path = `v1/sales/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

export const SalesClient = {
  getSaleByProductId,
  postNewSale,
  putUpdateSale,
  deleteSale,
}
