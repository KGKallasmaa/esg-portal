import { WEBAPP_URL } from '../../../config/url'
import { makeRequest } from '../../../config/request'
import Survey from '../../../models/survey'

async function postLatestUncompletedSurvey(
  surveyType: Survey.SurveyType
): Promise<Survey.Survey> {
  const path = `v1/survey/${surveyType}/latest-un-completed`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true)
}

async function postAnswerSurvey(
  payload: Survey.NewAnswerRequest
): Promise<null> {
  const path = `v1/survey/${payload.surveyId}/answer`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, payload)
}

async function getNextSurveyQuestion(
  surveyId: string
): Promise<Survey.Question> {
  const path = `v1/survey/${surveyId}/next`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}
async function getPreviousSurveyQuestion(
  surveyId: string
): Promise<Survey.Question> {
  const path = `v1/survey/${surveyId}/previous`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getSurveyResults(id: string): Promise<Survey.SurveyResult> {
  const path = `v1/survey/${id}/results`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getAllUncompletedSurveys(): Promise<Survey.SurveyType[]> {
  const path = `v1/survey/un-completed`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getSurveyById(id: string): Promise<Survey.Survey> {
  const path = `v1/survey/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

export const SurveyClient = {
  getSurveyById,
  postLatestUncompletedSurvey,
  postAnswerSurvey,
  getNextSurveyQuestion,
  getPreviousSurveyQuestion,
  getSurveyResults,
  getAllUncompletedSurveys,
}
