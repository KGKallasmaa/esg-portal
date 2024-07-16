export const ProducerQueries = {
  MyProducers: () => ['my_producers'],
  Producer: (id: string) => ['producer', { id }],
}
