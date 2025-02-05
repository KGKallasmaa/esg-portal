import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Product from '../../../models/product'
import {
  NewProductRequest,
  UpdateProductDetailsRequest,
} from './product_requests'

async function getProduct(id: string): Promise<Product.Product> {
  const path = `v1/products/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getProductsByProducerId(id: string): Promise<Product.Product[]> {
  const path = `v1/products/producer/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function postNewProduct(
  req: NewProductRequest
): Promise<Product.Product> {
  const path = `v1/products`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}

async function putUpdatProduct(
  id: string,
  req: UpdateProductDetailsRequest
): Promise<Product.Product> {
  const path = `v1/products/${id}/details`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'PUT', true, req)
}

async function deleteProduct(id: string): Promise<null> {
  const path = `v1/products/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

export const ProductClient = {
  getProduct,
  getProductsByProducerId,
  postNewProduct,
  putUpdatProduct,
  deleteProduct,
}
