import Portfolio from '../../models/portfolio'

export function calculateAppropriateDates(timeHorizon: Portfolio.TimeHorizon) {
  const now = new Date()
  const startOfToday = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  )
  const endOfToday = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  )
  switch (timeHorizon) {
    case 'day':
      // from 0.0.0 today till now
      return {
        start: startOfToday,
        end: endOfToday,
      }
    case 'week':
      // from 7 days ago till now
      return {
        start: new Date(
          Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() - 7)
        ),
        end: endOfToday,
      }
    case 'month':
      // from beginning of month till now
      return {
        start: new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1)),
        end: endOfToday,
      }
    case 'quarter':
      // from beginning of quarter till now
      return {
        start: new Date(
          Date.UTC(now.getFullYear(), now.getMonth() - (now.getMonth() % 3), 1)
        ),
        end: endOfToday,
      }
    case 'ytd':
      // from beginning of year till now
      return {
        start: new Date(Date.UTC(now.getFullYear(), 0, 1)),
        end: endOfToday,
      }
    case 'year':
      // from 1 year ago till now
      return {
        start: new Date(
          Date.UTC(now.getFullYear() - 1, now.getMonth(), now.getDate())
        ),
        end: endOfToday,
      }
    case 'all':
      return {
        start: new Date(Date.UTC(1960, 0, 1)),
        end: endOfToday,
      }
    default:
      console.error('Invalid time horizon')
      return {
        start: startOfToday,
        end: endOfToday,
      }
  }
}
