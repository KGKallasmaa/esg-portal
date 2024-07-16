namespace Producer {
  export type Producer = {
    id: string
    emissions?: {
      scope1: {
        co2e: {
          value: number
          unit: string
        }
      }
      scope2: {
        co2e: {
          value: number
          unit: string
        }
      }
      scope3: {
        co2e: {
          value: number
          unit: string
        }
      }
    }
  }
}

export default Producer
