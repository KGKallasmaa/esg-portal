namespace Institution {
  export type Institution = {
    id: string
    provider: string
    name: string
    products: string[]
    logo?: string | null
    primaryColor?: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export default Institution
