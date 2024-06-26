export const currencySymbolMap = new Map([
  ['EUR', '€'],
  ['USD', '$'],
  ['GBP', '£'],
])

export const maxTicksByHorizon = {
  day: 20,
  week: 7,
  month: 4,
  quarter: 3 * 4,
  year: 12,
  ytd: 12,
  '5-years': 20,
  '10-years': 20,
  all: 20,
}

export const allAssetClasses = ['SECURITIES', 'ACCOUNTS']

export const assetClassTableDisplay = {
  ALL: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderColor: 'rgba(59, 130, 246, 1)',
  },
  SECURITIES: {
    label: 'Securities',
    borderColor: 'rgb(5, 150, 105)',
    backgroundColor: 'rgba(5, 150, 105, 0.7)',
  },
  ACCOUNTS: {
    label: 'Accounts',
    borderColor: 'rgb(217, 119, 6)',
    backgroundColor: 'rgba(217, 119, 6, 0.7)',
  },
}

export const green = {
  borderColor: 'rgb(16, 185, 129)',
  backgroundColor: 'rgba(16, 185, 129, 0.7)',
}
export const red = {
  borderColor: 'rgb(220, 38, 38)',
  backgroundColor: 'rgba(220, 38, 38, 0.7)',
}
