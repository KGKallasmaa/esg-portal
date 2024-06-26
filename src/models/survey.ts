import Field from './form_field'

namespace Survey {
  export type SurveyType = 'initial_financial_aspirations'
  export type QuestionType =
    | 'primary_financial_goal'
    | 'birthday'
    | 'retirement_age'
    | 'retirement_duration'
    | 'market_volatility'
    | 'day_to_day_involvement'

  export type NewAnswerRequest = {
    surveyId: string
    questionType: QuestionType
    fieldName: string
    value: Record<string, any>
  }

  type QuestionPreRequisite = {
    questionTyp: QuestionType
    value: Field.FieldChoiceValue
  }

  export type Question = {
    type: QuestionType
    title: string
    description: string
    isOptional: boolean
    fields: Field.FormField[]
    preRequisites: QuestionPreRequisite[]
  }

  export type SurveyResult = {
    id: string
    surveyId: string
    userId: string
    result: string
    createdAt: Date
  }

  export type Survey = {
    id: string
    userId: string
    type: SurveyType
    createdAt: Date
    completedAt?: Date
    startedAt?: Date
  }
}
export default Survey
