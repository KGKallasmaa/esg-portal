namespace Producer {
  export type Producer = {
    id: string
    url: string
    emissions: {
      scope1: {
        value: number
        unit: string
      }
      scope2: {
        value: number
        unit: string
      }
      scope3: {
        value: number
        unit: string
      }
    }
  }
}

export default Producer
