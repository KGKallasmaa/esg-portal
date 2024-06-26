import { useGetUncompletedSurveys } from '../../domain/survey/hooks/survey_hooks'
import InitialFinancialAspirationsModal from './InitalFinancialAspirationsModal'

export default function IYFModals() {
  const {
    data: unansweredForms,
    refetch,
    isLoading,
    isError,
  } = useGetUncompletedSurveys()

  if (isLoading || isError || unansweredForms.length === 0) {
    return null
  }

  const handleFormComplete = () => {
    refetch()
    location.reload()
  }

  return (
    <>
      {unansweredForms.map((formName) => {
        switch (formName) {
          case 'initial_financial_aspirations':
            return (
              <InitialFinancialAspirationsModal
                key="modal_initial_financial_aspirations"
                onComplete={handleFormComplete}
              />
            )
        }
      })}
    </>
  )
}
