export default function categoryEmojis(
  primaryCategory: string,
  secondaryCategory?: string
) {
  if (!secondaryCategory) {
    return primaryOnlyCategoryEmoji(primaryCategory)
  }
  switch (primaryCategory) {
    case 'INCOME':
      switch (secondaryCategory) {
        case 'INCOME_WAGES':
          return '💰'
        default:
          console.error('unknown secondary for income: ' + secondaryCategory)
          return '💵'
      }
    case 'ENTERTAINMENT':
      switch (secondaryCategory) {
        case 'ENTERTAINMENT_CASINOS_AND_GAMBLING':
          return '🎰'
        case 'ENTERTAINMENT_TV_AND_MOVIES':
          return '🎥'
        case 'ENTERTAINMENT_MUSIC_AND_AUDIO':
          return '🎵'
        case 'ENTERTAINMENT_OTHER_ENTERTAINMENT':
          return '🎮'
        case 'ENTERTAINMENT_SPORTING_EVENTS_AMUSEMENT_PARKS_AND_MUSEUMS':
          return '🎡'
        case undefined:
          return '🎮'
        default:
          console.error('unknown secondary: ' + secondaryCategory)
          return '🎮'
      }
    case 'GENERAL_MERCHANDISE':
      switch (secondaryCategory) {
        case 'GENERAL_MERCHANDISE_ELECTRONICS':
          return '📱'
        case 'GENERAL_MERCHANDISE_PET_SUPPLIES':
          return '🐶'
        case 'GENERAL_MERCHANDISE_SPORTING_GOODS':
          return '⚽'
        case 'GENERAL_MERCHANDISE_OTHER_GENERAL_MERCHANDISE':
          return '🛍️'
        case 'GENERAL_MERCHANDISE_CLOTHING_AND_ACCESSORIES':
          return '👗'
        case 'GENERAL_MERCHANDISE_CONVENIENCE_STORES':
          return '🏪'
        case 'GENERAL_MERCHANDISE_DEPARTMENT_STORES':
          return '🏬'
        case 'GENERAL_MERCHANDISE_SUPERSTORES':
          return '🏬'
        default:
          console.error(
            'unknown secondary for general merch: ' + secondaryCategory
          )
          return '🛍️'
      }
    case 'MEDICAL':
      switch (secondaryCategory) {
        case 'MEDICAL_PHARMACIES_AND_SUPPLEMENTS':
          return '💊'
        case 'MEDICAL_DENTAL_CARE':
          return '🦷'
        default:
          console.error('unknown secondary: ' + secondaryCategory)
          return '🏥'
      }
    case 'LOAN_PAYMENTS':
      switch (secondaryCategory) {
        case 'LOAN_PAYMENTS_PERSONAL_LOAN_PAYMENT':
          return '🤝'
        case 'LOAN_PAYMENTS_MORTGAGE_PAYMENT':
          return '🏠'
        case 'LOAN_PAYMENTS_CREDIT_CARD_PAYMENT':
          return '💳'
        case 'LOAN_PAYMENTS_CAR_PAYMENT':
          return '🚗'
        case 'LOAN_PAYMENTS_OTHER_PAYMENT':
          return '🤝'
        default:
          console.error(
            'unknown secondary for loan payments: ' + secondaryCategory
          )
          return ''
      }
    case 'PERSONAL_CARE':
      switch (secondaryCategory) {
        case 'PERSONAL_CARE_HAIR_AND_BEAUTY':
          return '💇'
        case 'PERSONAL_CARE_GYMS_AND_FITNESS_CENTERS':
          return '🏋️'
        default:
          console.error(
            'unknown secondary for personal care: ' + secondaryCategory
          )
          return ''
      }
    case 'GENERAL_SERVICES':
      switch (secondaryCategory) {
        case 'GENERAL_SERVICES_INSURANCE':
          return '🏥'
        case 'GENERAL_SERVICES_ACCOUNTING_AND_FINANCIAL_PLANNING':
          return '📈'
        case 'GENERAL_SERVICES_POSTAGE_AND_SHIPPING':
          return '📦'
        default:
          console.error(
            'unknown secondary for general services: ' + secondaryCategory
          )
          return ''
      }
    case 'HOME_IMPROVEMENT':
      switch (secondaryCategory) {
        case 'HOME_IMPROVEMENT_OTHER_HOME_IMPROVEMENT':
          return '🏠'
        case 'HOME_IMPROVEMENT_FURNITURE':
          return '🛋️'
        case 'HOME_IMPROVEMENT_REPAIR_AND_MAINTENANCE':
          return '🔧'
        case 'HOME_IMPROVEMENT_HARDWARE':
          return '🔩'
        default:
          console.error(
            'unknown secondary for home improvement: ' + secondaryCategory
          )
          return ''
      }
    case 'BANK_FEES':
      switch (secondaryCategory) {
        case 'BANK_FEES_FOREIGN_TRANSACTION_FEES':
          return '🌎'
        case 'BANK_FEES_OTHER_BANK_FEES':
          return '🏦'
        case 'BANK_FEES_INTEREST_CHARGE':
          return '💰'
        case 'BANK_FEES_OVERDRAFT_FEES':
          return '💰'
        default:
          console.error('unknown secondary for bank fees: ' + secondaryCategory)
          return ''
      }
    case 'GOVERNMENT_AND_NON_PROFIT':
      switch (secondaryCategory) {
        case 'GOVERNMENT_AND_NON_PROFIT_GOVERNMENT_DEPARTMENTS_AND_AGENCIES':
          return '🏛️'
        case 'GOVERNMENT_AND_NON_PROFIT_DONATIONS':
          return '🎗'
        default:
          console.error(
            'unknown secondary for government and non profit: ' +
              secondaryCategory
          )
          return ''
      }
    case 'TRAVEL':
      switch (secondaryCategory) {
        case undefined:
          return '✈️'
        case 'TRAVEL_FLIGHTS':
          return '✈️'
        default:
          console.error('unknown secondary for travel: ' + secondaryCategory)
          return ''
      }
    case 'TRANSPORTATION':
      switch (secondaryCategory) {
        case 'TRANSPORTATION_PUBLIC_TRANSIT':
          return '🚌'
        case 'TRANSPORTATION_TAXIS_AND_RIDE_SHARES':
          return '🚕'
        default:
          console.error(
            'unknown secondary for transportation: ' + secondaryCategory
          )
          return ''
      }
    case 'FOOD_AND_DRINK':
      switch (secondaryCategory) {
        case 'FOOD_AND_DRINK_GROCERIES':
          return '🛒'
        case 'FOOD_AND_DRINK_COFFEE':
          return '☕'
        case 'FOOD_AND_DRINK_FAST_FOOD':
          return '🍔'
        case 'FOOD_AND_DRINK_RESTAURANT':
          return '🍽️'
        default:
          console.error(
            'unknown secondary for food and drink: ' + secondaryCategory
          )
          return ''
      }
    case 'RENT_AND_UTILITIES':
      switch (secondaryCategory) {
        case 'RENT_AND_UTILITIES_WATER':
          return '💧'
        case 'RENT_AND_UTILITIES_OTHER_UTILITIES':
          return '🏠'
        case 'RENT_AND_UTILITIES_RENT':
          return '🏠'
        default:
          console.error(
            'unknown secondary for rent and utilities: ' + secondaryCategory
          )
          return ''
      }
    case 'TRANSFER_IN':
      switch (secondaryCategory) {
        case 'TRANSFER_IN_SAVINGS':
          return '💰'
        case 'TRANSFER_IN_ACCOUNT_TRANSFER':
          return '🏦'
        default:
          console.error(
            'unknown secondary for TRANSFER_IN ' + secondaryCategory
          )
          return ''
      }
    case 'TRANSFER_OUT':
      switch (secondaryCategory) {
        case 'TRANSFER_OUT_SAVINGS':
          return '💰'
        case 'TRANSFER_OUT_INVESTMENT_AND_RETIREMENT_FUNDS':
          return '🏦'
        case 'TRANSFER_OUT_ACCOUNT_TRANSFER':
          return '↔️'
        default:
          console.error(
            'unknown secondary for TRANSFER_OUT ' + secondaryCategory
          )
          return ''
      }

    case 'OTHER':
      return ''
    case 'Shops':
      return '🛍️'
    default:
      console.error('unknown primary: ' + primaryCategory)
      return ''
  }
}

function primaryOnlyCategoryEmoji(primaryCategory: string) {
  switch (primaryCategory) {
    case 'INCOME':
      return '💵'
    case 'TRANSFER_IN':
      return '➡️'
    case 'ENTERTAINMENT':
      return '🎮'
    case 'GENERAL_MERCHANDISE':
      return '🛍️'
    case 'MEDICAL':
      return '🏥'
    case 'TRAVEL':
      return '✈️'
    case 'LOAN_PAYMENTS':
      return '🤝'
    case 'FOOD_AND_DRINK':
      return '🍔'
    case 'BANK_FEES':
      return '🏦'
    case 'PERSONAL_CARE':
      return '💇'
    case 'HOME_IMPROVEMENT':
      return '🏠'
    case 'GENERAL_SERVICES':
      return '📈'
    case 'GOVERNMENT_AND_NON_PROFIT':
      return '🏛️'
    case 'RENT_AND_UTILITIES':
      return '🏠'
    case 'TRANSPORTATION':
      return '🚗'
    case 'TRANSFER_OUT':
      return '⬅️'
    case 'OTHER':
      return ''
    case 'Shops':
      return '🛍️'
    default:
      console.error('unknown primary: ' + primaryCategory)
      return ''
  }
}
