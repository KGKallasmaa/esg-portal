namespace FormField {
  export type FieldType =
    | 'short_text'
    | 'long_text'
    | 'number'
    | 'date'
    | 'yes_no'
    | 'select'
  /*
  export type FieldType =
    | 'short_text'
    | 'long_text'
    | 'number'
    | 'date'
    | 'yes_no'
    | 'multiple_choice'
    | 'select'
   */

  export type Choice = {
    name: string
    title: string
    value: any
    [key: string]: any
  }

  export type FormField = {
    name: string
    isOptional: boolean
    defaultValue?: Choice
    title?: string
    description?: string
    placeholder?: string
    type: FieldType
    choices: Choice[]
    minLength?: number
    maxLength?: number
    minNumber?: number
    maxNumber?: number
    minDate?: Date
    maxDate?: Date
  }
  export type FieldChoiceValue = any
}
export default FormField
