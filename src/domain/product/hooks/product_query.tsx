export const ProductQueries = {
  Product: (id: string) => ['product', { id }],
  ProducerProducts: (id: string) => ['producer_products', { id }],
}
