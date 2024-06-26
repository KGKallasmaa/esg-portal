export const MetricsQueries = {
  DashboardMetricsBetweenDates: (start: Date, end: Date) => [
    'dashboardMetricsBetweenDates',
    start,
    end,
  ],
}
