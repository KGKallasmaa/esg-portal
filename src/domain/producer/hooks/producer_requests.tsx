export type UpdateProducerDetailsRequest = {
  emissions: [
    {
      scope: 'scope1'
      value: {
        value: number
        unit: string
      }
    },
    {
      scope: 'scope2'
      value: {
        value: number
        unit: string
      }
    },
    {
      scope: 'scope3'
      value: {
        value: number
        unit: string
      }
    }
  ]
}
