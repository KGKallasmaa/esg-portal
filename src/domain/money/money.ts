import Money from '../../models/money'

export function formatMoney(
  money: Money.MoneyValue | undefined,
  rounding?: number
) {
  if (!money) {
    return ''
  }
  const locale = navigator.language || 'en-US'
  let options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: money.currency,
    currencyDisplay: 'symbol',
  }

  if (money.currency === 'USD') {
    options.currencyDisplay = 'narrowSymbol'
  }

  let moneyAmount = rounding ? round(money.amount, rounding) : money.amount
  // if all the digitis after dot are 0, remove them
  if (moneyAmount == round(moneyAmount, 0)) {
    options.maximumFractionDigits = 0
  }
  const formatter = new Intl.NumberFormat(locale, options)
  return formatter.format(moneyAmount)
}

export function formatMoneyAbs(
  money: Money.MoneyValue | undefined,
  rounding?: number
) {
  if (!money) {
    return ''
  }
  money.amount = Math.abs(money.amount)
  return formatMoney(money, rounding)
}

export function round(value: number, decimals: number) {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
}

export function formatNumber(amount: number | undefined, rounding?: number) {
  if (!amount) {
    return ''
  }
  const locale = navigator.language || 'en-US'
  const formatter = new Intl.NumberFormat(locale)
  const moneyAmount = rounding ? round(amount, rounding) : amount
  return formatter.format(moneyAmount)
}

export function futureValue(
  presentValue: number,
  rate: number,
  periods: number
) {
  return presentValue * Math.pow(1 + rate, periods)
}
