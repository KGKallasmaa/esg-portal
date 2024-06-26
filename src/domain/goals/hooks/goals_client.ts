import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Goals from '../../../models/goals'

async function getGoalById(id: string): Promise<Goals.Goal> {
  const path = `v1/goals/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getMyGoals(): Promise<Goals.Goal[]> {
  const path = `v1/goals`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getGoalPlan(goalId: string): Promise<Goals.GoalPlan> {
  const path = `v1/goals/${goalId}/plan`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function postNewGoal(typee: Goals.GoalType): Promise<null> {
  const path = `v1/goals`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  const payload = {
    type: typee,
  }
  return await makeRequest(url, 'POST', true, payload)
}

async function putUpdateGoal(goal: Goals.Goal): Promise<Goals.GoalPlan> {
  const path = `v1/goals`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  const payload = { goal: goal }
  return await makeRequest(url, 'PUT', true, payload)
}

export const GoalsClient = {
  getGoalById,
  getMyGoals,
  getGoalPlan,
  postNewGoal,
  putUpdateGoal,
}
