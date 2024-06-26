export const GoalQueries = {
  GoalById: (id) => ['goal', id],
  MyGoals: () => ['myGoals', []],
  MyGoalPlan: (goalId) => ['goalPlan', goalId],
}
