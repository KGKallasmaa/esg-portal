import Modal from '../Modal'
import {
  useAnswerSurveyMutation,
  useGetLatestUncompletedSurvey,
  useGetNextSurveyQuestion,
  useGetPreviousSurveyQuestion,
} from '../../domain/survey/hooks/survey_hooks'
import Survey from '../../models/survey'
import logo from '../assets/logos/merlin_logo.png'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import FormField from '../../models/form_field'

const inputStyles =
  'block w-full flex-1 rounded-xl border border-gray-300 bg-white py-1 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
const selectStyles =
  'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
const renderOptions = (choices: any[]) =>
  choices.map((choice) => (
    <option key={choice.name} value={choice.value}>
      {choice.title}
    </option>
  ))

export default function InitialFinancialAspirationsModal({
  onComplete,
}: {
  onComplete: () => void
}) {
  const { data: survey, isSuccess } = useGetLatestUncompletedSurvey(
    'initial_financial_aspirations'
  )

  if (isSuccess && survey) {
    return <Survey onComplete={onComplete} surveyId={survey.id} />
  }
}

function Survey({ surveyId, onComplete }) {
  const [hasSeenWelcomeScreen, setHasSeenWelcomeScreen] = useState(false)

  const {
    data: previousQuestion,
    refetch: refetchPrevious,
    isLoading: isLoadingPrevious,
  } = useGetPreviousSurveyQuestion(surveyId)

  const {
    data: nextQuestion,
    refetch: refetchNext,
    isLoading: isLoadingNext,
  } = useGetNextSurveyQuestion(surveyId)

  const handleQuestionAnswered = () => {
    refetchPrevious()
    refetchNext()
  }

  const isVeryFirstQuestion =
    !isLoadingPrevious && !previousQuestion && !hasSeenWelcomeScreen
  const isVeryLastQuestion = !isLoadingNext && !nextQuestion
  const isMidQuestion =
    !isVeryFirstQuestion && !isVeryLastQuestion && nextQuestion != null

  return (
    <Modal
      title=""
      backgroundColor="bg-white"
      border="border border-primary"
      closable={false}
      onClose={() => {}} // cannot close this
    >
      {isVeryFirstQuestion && (
        <FirstQuestion
          title="Initial financial aspirations"
          description="We're going to ask you a few questions about your personal finances."
          onComplete={() => setHasSeenWelcomeScreen(true)}
        />
      )}
      {isVeryLastQuestion && (
        <LastQuestion
          onComplete={onComplete}
          title="Thank you"
          description="Thank you so much for answering this survey. Click the link below to see the results"
          surveyId={surveyId}
        />
      )}
      {isMidQuestion && (
        <Question
          onQuestionAnswered={handleQuestionAnswered}
          surveyId={surveyId}
          question={nextQuestion}
        />
      )}
    </Modal>
  )
}

function FirstQuestion({
  title,
  description,
  onComplete,
}: {
  title: string
  description: string
  onComplete: () => void
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="m-4">
        <Image src={logo} alt="Merlin" width={50} height={50} />
      </div>
      <div className="mb-2 flex h-12 items-center justify-center">
        <h1 className={'mt-5 flex text-center text-xl font-semibold'}>
          {title}
        </h1>
      </div>

      <p className="my-4 text-center text-sm leading-6">{description}</p>
      <div className="relative flex flex-col">
        <div className="col-span-2 mb-1 mt-2 flex justify-between">
          <button
            title="Start"
            type="button"
            onClick={() => onComplete()}
            className={'ml-2 w-full rounded-3xl bg-primary px-6 py-3'}
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  )
}

function LastQuestion({
  title,
  description,
  surveyId,
  onComplete,
}: {
  title: string
  description: string
  surveyId: string
  onComplete: () => void
}) {
  const handleComplete = () => {
    onComplete()
    window.location.href = `/survey/results/${surveyId}`
  }
  return (
    <div className="flex flex-col items-center">
      <div className="m-4">
        <Image src={logo} alt="Merlin" width={50} height={50} />
      </div>
      <div className="mb-2 flex h-12 items-center justify-center">
        <h1 className={'mt-5 flex text-center text-xl font-semibold'}>
          {title}
        </h1>
      </div>

      <p className="my-4 text-center text-sm leading-6">{description}</p>
      <div className="relative flex flex-col">
        <div className="col-span-2 mb-1 mt-2 flex justify-between">
          <Link
            prefetch={true}
            scroll={true}
            onClick={handleComplete}
            href={`/survey/results/${surveyId}`}
            className={'ml-2 w-full rounded-3xl bg-primary px-6 py-3'}
          >
            See the results
          </Link>
        </div>
      </div>
    </div>
  )
}

function Question({
  surveyId,
  question,
  onQuestionAnswered,
}: {
  surveyId: string
  question: Survey.Question
  onQuestionAnswered: () => void
}) {
  const { title, description, isOptional } = question
  const titleIsPresent = title?.length > 0
  const descriptionIsPresent = description?.length > 0
  const titleAndDescriptionArePresent = titleIsPresent && descriptionIsPresent
  const noInfoIsPresent = !titleIsPresent && !descriptionIsPresent

  let initialValuesMap = {}
  for (const field of question.fields) {
    initialValuesMap[field.name] = null
    if (field.defaultValue) {
      initialValuesMap[field.name] = field.defaultValue.value
    } else {
      if (field.type === 'select') {
        initialValuesMap[field.name] = field.choices[0].value
      }
    }
  }

  const addAnswer = useAnswerSurveyMutation(surveyId, {
    onSuccess: () => {
      onQuestionAnswered()
    },
    onError: (err) => {
      console.error('problem adding answer', err)
    },
  })

  const onSubmit = (event) => {
    for (const field of question.fields) {
      const value = event.target[field.name].value
      const payload = {
        surveyId: surveyId,
        questionType: question.type,
        fieldName: field.name,
        value: value,
      }
      addAnswer.mutate(payload)
    }
  }

  return (
    <div className="mb-20 flex w-full flex-col items-center md:mb-0">
      <div className="relative flex flex-col">
        <form onSubmit={onSubmit} method="post">
          {!noInfoIsPresent && (
            <>
              {titleAndDescriptionArePresent ? (
                <>
                  <p className="mt-2 text-center text-sm leading-6">{title}</p>
                  <p className="mt-2 text-center text-sm leading-6">
                    {description}
                  </p>
                </>
              ) : (
                <>
                  {titleIsPresent && (
                    <p className="mt-2 text-center text-sm leading-6">
                      {title}
                    </p>
                  )}
                  {descriptionIsPresent && (
                    <p className="mt-2 text-center text-sm leading-6">
                      {description}
                    </p>
                  )}
                </>
              )}
            </>
          )}

          {question.fields.map((merlinField, nr) => {
            const { title } = merlinField
            return (
              <>
                <div className="col-span-4 mb-1">
                  {title && (
                    <label className="mb-1 mt-5 text-center text-sm font-semibold">
                      {title}
                    </label>
                  )}
                  <div className="mt-2">
                    <SpecificField
                      key={'merlinField' + nr}
                      merlinField={merlinField}
                    />
                  </div>
                </div>
              </>
            )
          })}

          <div className="col-span-2 mb-1 mt-2 flex justify-between">
            <NavigationButtons
              isLoading={addAnswer.isLoading}
              isEnabled={true}
              isOptionalMidQuestion={isOptional}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

function NavigationButtons({
  isLoading,
  isEnabled,
  isOptionalMidQuestion,
}: {
  isLoading?: boolean
  isEnabled: boolean
  isOptionalMidQuestion?: boolean
}) {
  if (isOptionalMidQuestion) {
    return (
      <>
        <button
          title="Skip"
          disabled={isLoading}
          className={
            'here ml-2 w-1/2 rounded-3xl bg-white px-3 py-3 text-center text-sm font-semibold text-gray-500'
          }
          type="submit"
        >
          Skip
        </button>
        <button
          disabled={!isEnabled || isLoading}
          title="Next"
          type="submit"
          className={'ml-2 w-1/2 rounded-3xl bg-primary px-3 py-3'}
        >
          {!isLoading ? 'Next' : 'Loading ...'}
        </button>
      </>
    )
  }

  return (
    <>
      <button
        disabled={!isEnabled || isLoading}
        title="Next"
        type="submit"
        className={classNames('ml-2 w-full rounded-3xl bg-primary px-6 py-3', {
          'bg-gray-400': !isEnabled,
        })}
      >
        {!isLoading ? 'Next' : 'Loading ...'}
      </button>
    </>
  )
}

function SpecificField({ merlinField }: { merlinField: FormField.FormField }) {
  const { type, placeholder, name, choices, defaultValue } = merlinField

  switch (type) {
    case 'short_text':
    case 'long_text':
    case 'date':
    case 'number':
      return (
        <>
          <input
            name={name}
            className={inputStyles}
            placeholder={placeholder}
            type={type}
            value={defaultValue?.value}
          />
        </>
      )
    case 'select':
    case 'yes_no':
      return (
        <select
          id={name}
          name={name}
          placeholder={placeholder}
          className={selectStyles}
        >
          {type === 'select' ? (
            <>{renderOptions(choices)}</>
          ) : (
            <>
              <option key={'yes'} value="true">
                Yes
              </option>
              <option key={'no'} value="false">
                No
              </option>
            </>
          )}
        </select>
      )
    // Add more cases as needed
    default:
      console.error(`Unknown specific field type: ${type}`)
      return null
  }
}
