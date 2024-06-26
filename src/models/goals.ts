import Money from './money'

namespace Goals {
  export type GoalType = 'RETIREMENT' | 'EMERGENCY_FUND'
  export type Goal = {
    id: string
    type: GoalType
    name: string
    userId: string
    createdAt: Date
    metadata: any
  }
  export type GoalPlan = {
    labels: Date[]
    portfolioValues: {
      date: Date
      value: Money.MoneyValue
    }[]
  }
}

export default Goals
