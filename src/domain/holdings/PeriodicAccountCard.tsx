import Assets from '../../models/assets'
import { formatMoney } from '../money/money'
import Holdings from '../../models/holdings'

export function PeriodicAccountCard({
  periodicAccount,
  asset,
  holding,
}: {
  periodicAccount: Holdings.PeriodicHolding
  asset: Assets.Account
  holding: Holdings.Holding
}) {
  const accountDetailsHref = `/portfolio/accounts/${holding.assetId}`
  const { type, subType, label, officialName } = asset.metadata
  const onClick = () => {
    window.location.href = accountDetailsHref
  }
  return (
    <li
      onClick={onClick}
      key={'income_transaction_' + periodicAccount.id}
      className="relative flex justify-between  gap-x-6 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 sm:px-6 md:py-4 lg:py-5"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
          <span className="text-xl">{accountTypeEmojiMap(type, subType)}</span>
        </div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-primary">
            <span className="absolute inset-x-0 -top-px bottom-0 " />
            {label}
          </p>
          <p className="mt-1 flex text-xs leading-5 text-gray-500">
            {officialName}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-4">
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900 dark:text-gray-300">
            {formatMoney(periodicAccount.marketValuePerUnit)}
          </p>
        </div>
      </div>
    </li>
  )
}

function accountTypeEmojiMap(
  accountType: Assets.AccountType,
  subType: Assets.AccountSubtype | null
) {
  switch (accountType) {
    case 'loan':
      switch (subType) {
        case 'mortgage':
          return '🏠'
        case 'student':
          return '🎓'
        default:
          console.log('Unknown loan subtype: ' + subType)
          return '💰'
      }
    case 'credit':
      switch (subType) {
        case 'credit card':
          return '💳'
        default:
          console.log('Unknown credit subtype: ' + subType)
          return '💰'
      }
    case 'investment':
      switch (subType) {
        case 'brokerage':
          return '📈'
        case 'retirement':
          return '🏦'
        case 'savings':
          return '💰'
        case '401k':
          return '🏦'
        case 'ira':
          return '🏦'
        default:
          console.log('Unknown investment subtype: ' + subType)
          return '💰'
      }
    case 'depository':
      switch (subType) {
        case 'checking':
          return '💳'
        case 'savings':
          return '💰'
        case 'money market':
          return '💰'
        case 'cd':
          return '💰'
        default:
          console.log('Unknown depository subtype: ' + subType)
          return '💰'
      }
    default:
      console.log('Unknown account type: ' + accountType)
      return '💰'
  }
}
