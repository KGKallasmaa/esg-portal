export function numberOfDaysToday(date: Date) {
  const dateDiff = new Date(date).getTime() - new Date().getTime()

  const locale = navigator.language || 'en-US'
  const formatter = new Intl.RelativeTimeFormat(locale)
  return formatter.format(Math.round(dateDiff / 100_000_000), 'days')
}

export function toLocalDateString(date: Date) {
  const options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const locale = navigator.language || 'en-US'
  // @ts-ignore:next-line
  return date.toLocaleDateString(locale, options)
}
