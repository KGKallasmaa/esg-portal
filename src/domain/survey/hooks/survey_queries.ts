import Survey from '../../../models/survey'

export const SurveyQueries = {
  Survey: (id: string) => ['survey', id],
  LatestUncompletedSurvey: (type: Survey.SurveyType) => [
    'latestUnCompletedSurvey',
    type,
  ],
  SurveyPreviousQuestion: (id: string) => ['surveyPreviousQuestion', id],
  SurveyNextQuestion: (id: string) => ['surveyNextQuestion', id],
  SurveyResults: (id: string) => ['surveyResults', id],
  UnCompletedSurveys: () => ['unCompletedSurveys'],
}
