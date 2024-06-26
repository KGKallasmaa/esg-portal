import {
  ArrowLeftIcon,
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  PencilIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useState } from 'react'
import AutomaticAccountForm from './AutomaticAccountForm'
import ManualSecurityForm from './ManualSecurityForm'

const newAssetChoices = [
  {
    type: 'accounts',
    title: 'Checking Accounts',
    description: 'Securely connect with over 1000 banks across the globe',
    icon: BanknotesIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    subChoices: {
      label: 'Add Checking Accounts',
      choices: [
        {
          title: 'Automatic linking',
          description:
            'Connect your account, and we will automatically update your balance and transactions',
          type: 'automaticAccountLinking',
          icon: ArrowPathIcon,
          iconForeground: 'text-teal-700',
          iconBackground: 'bg-teal-50',
        },
        {
          title: 'Enter manually',
          description: 'Manually add you checking or savings account',
          type: 'manualAccountLinking',
          comingSoon: true,
          icon: PencilIcon,
          iconForeground: 'text-teal-700',
          iconBackground: 'bg-teal-50',
        },
      ],
    },
  },
  {
    type: 'securities',
    title: 'Stocks and Shares',
    description: 'Connect your brokerage accounts to sync your investments',
    icon: ArrowTrendingUpIcon,
    iconForeground: 'text-green-700',
    iconBackground: 'bg-green-50',
    subChoices: {
      label: 'Add Stocks and Shares',
      choices: [
        {
          title: 'Automatic linking',
          description:
            'Securely connect your investment accounts to track your portfolio',
          type: 'automaticSecurityLinking',
          comingSoon: true,
          icon: ArrowPathIcon,
          iconForeground: 'text-green-700',
          iconBackground: 'bg-green-50',
        },
        {
          title: 'Enter manually',
          description: 'Add any investments you own manually',
          type: 'manualSecurityLinking',
          icon: PencilIcon,
          iconForeground: 'text-green-700',
          iconBackground: 'bg-green-50',
        },
      ],
    },
  },

  {
    type: 'realEstate',
    title: 'Real Estate',
    description: 'List your properties and track their value',
    icon: BuildingOfficeIcon,
    iconForeground: 'text-orange-700',
    iconBackground: 'bg-orange-50',
    comingSoon: true,
  },

  {
    type: 'startups',
    title: 'Startups',
    description: 'Track all of your startup investments',
    icon: RocketLaunchIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
    comingSoon: true,
  },
]

function NewAssetChoiseForm({ onClose }: { onClose: () => void }) {
  const [selectedChoice, setSelectedChoice] = useState(null)
  const handleSubChoice = (type: string) => {
    const myChoice = newAssetChoices.find((choice) => choice.type === type)
    if (myChoice) {
      // @ts-ignore
      setSelectedChoice(myChoice)
    }
  }
  if (selectedChoice) {
    return (
      <NewSubAssetChoiceForm
        // @ts-ignore
        label={selectedChoice?.subChoices?.label || ''}
        // @ts-ignore
        choices={selectedChoice?.subChoices?.choices || []}
        onCompleted={onClose}
        onGoBack={() => setSelectedChoice(null)}
        // @ts-ignore
        onClick={handleSubChoice}
      />
    )
  }

  return (
    <div className="mt-2">
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {newAssetChoices.map((action, actionIdx) => (
          <NewPrimaryAssetChoice
            key={action.type}
            index={actionIdx}
            // @ts-ignore
            action={action}
            onClick={handleSubChoice}
          />
        ))}
      </div>
    </div>
  )
}

function NewPrimaryAssetChoice({
  index,
  action,
  onClick,
}: {
  index: number
  action: {
    title: string
    type: string
    description: string
    icon: any
    iconForeground: string
    iconBackground: string
    comingSoon?: boolean
    subChoices?: {
      label: string
      choices: {
        name: string
        description: string
        type: string
        comingSoon?: boolean
      }[]
    }
  }
  onClick: (type: string) => void
}) {
  const numberOfActions = newAssetChoices.length
  const {
    iconBackground,
    iconForeground,
    title,
    description,
    type,
    comingSoon,
  } = action

  return (
    <div
      key={'new-asset-choice-' + index}
      className={classNames(
        index === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
        index === 1 ? 'sm:rounded-tr-lg' : '',
        index === numberOfActions - 2 ? 'sm:rounded-bl-lg' : '',
        index === numberOfActions - 1
          ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
          : '',
        comingSoon === true
          ? 'opacity-50 dark:bg-gray-900'
          : ' dark:bg-gray-700',
        'group relative bg-white p-6 focus-within:ring-inset hover:bg-gray-300 dark:hover:bg-gray-600'
      )}
    >
      <div>
        <span
          className={classNames(
            iconBackground,
            iconForeground,
            'inline-flex rounded-lg p-3 ring-4 ring-white'
          )}
        >
          <action.icon className="h-6 w-6" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-8">
        <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-300">
          <button
            disabled={comingSoon === true}
            onClick={() => onClick(type)}
            className="focus:outline-none"
          >
            {/* Extend touch target to entire panel */}
            <span className="absolute inset-0" aria-hidden="true" />
            {title}{' '}
            {action.comingSoon === true && (
              <p className="text-green-700">(coming soon)</p>
            )}
          </button>
        </h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
      <span
        className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
        aria-hidden="true"
      >
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
        </svg>
      </span>
    </div>
  )
}

function NewSubAssetChoiceForm({
  label,
  choices,
  onGoBack,
  onCompleted,
}: {
  label: string
  choices: {
    title: string
    description: string
    type: string
    comingSoon?: boolean
  }[]
  onGoBack: () => void
  onCompleted: () => void
}) {
  const [selectedSubChoise, setSelectedSubChoice] = useState(null)

  if (selectedSubChoise) {
    return handleSelectedSubChoise(selectedSubChoise, onCompleted)
  }

  return (
    <div className="mt-2">
      <div className="mb-2 flex">
        <button onClick={onGoBack}>
          <ArrowLeftIcon className="h-6 w-6 text-gray-400" />
        </button>
        <h3 className="ml-2 text-base font-semibold leading-6 text-gray-900 dark:text-gray-300">
          {label}
        </h3>
      </div>

      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {choices?.map((action, actionIdx) => (
          <NewPrimaryAssetChoice
            key={'sub-asset-choice' + action.type}
            index={actionIdx}
            // @ts-ignore
            action={action}
            // @ts-ignore
            onClick={(type) => setSelectedSubChoice(type)}
          />
        ))}
      </div>
    </div>
  )
}
function handleSelectedSubChoise(type: string, onSuccess: () => void) {
  switch (type) {
    // account asset
    case 'automaticAccountLinking':
      return <AutomaticAccountForm onAccessGranted={onSuccess} />
    // security asset
    case 'manualSecurityLinking':
      return <ManualSecurityForm onStockSubmitted={onSuccess} />
    default:
      console.error('Unknown choice type: ' + type)
      return null
  }
}

export default NewAssetChoiseForm
