import Money from './money'

namespace Settings {
  export type General = {
    firstName: string
    lastName: string
    dateOfBirth: Date
    language: 'en' | 'es' | 'fr' | 'de'
    currency: Money.Currency
  }

  export type UserSettings = {
    id: string
    userId: string
    general: General
  }
}
export default Settings
