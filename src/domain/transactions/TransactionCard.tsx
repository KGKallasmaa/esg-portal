import classNames from 'classnames'
import Transactions from '../../models/transactions'
import useCashflowStore from '../../state_management/stores/cashflow.store'
import categoryEmojis from '../cashflow/category_emoji'
import { formatMoneyAbs } from '../money/money'
import AccountName from './AccountName'
import InstitutionLogo from '../institution/InstitutionLogo'

export function TransactionCard({
  transaction,
}: {
  transaction: Transactions.Transaction
}) {
  const { detailedView, setDetailedView } = useCashflowStore()

  const handleClick = () => {
    const key = 'transaction_details_' + transaction.id
    if (key === detailedView) {
      setDetailedView('')
    } else {
      setDetailedView(key)
    }
  }

  const {
    id,
    accountId,
    money,
    name,
    merchantName,
    paymentChannel,
    personalFinanceCategory,
    transactionType,
    isIncome,
    includeInAnalysis,
    highlight,
  } = transaction

  return (
    <>
      <li
        onClick={handleClick}
        key={'income_transaction_' + id}
        className="relative flex justify-between gap-x-6 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 sm:px-6"
      >
        <div className="flex min-w-0 gap-x-4">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
            <span className="text-xl">
              {categoryEmojis(
                personalFinanceCategory?.primary,
                personalFinanceCategory?.detailed
              )}
            </span>
          </div>
          <div className="min-w-0 flex-auto">
            <p
              className={classNames(
                'text-sm font-semibold leading-6 text-primary',
                {
                  'line-through': !includeInAnalysis,
                }
              )}
            >
              <span className="absolute inset-x-0 -top-px bottom-0" />
              {merchantName || name} {highlight && '⭐'}
            </p>

            <p className={classNames('text-gray-500')}>
              <span className="absolute inset-x-0 -top-px bottom-0" />
              {accountId && (
                <div className="flex">
                  <InstitutionLogo accountId={accountId} />{' '}
                  <div className="ml-2">
                    <AccountName accountId={accountId} />
                  </div>
                </div>
              )}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-x-4">
          <div className="sm:flex sm:flex-col sm:items-end">
            <p
              className={classNames('text-sm leading-6', {
                'text-green-500 dark:text-green-300': isIncome,
                'text-gray-900 dark:text-gray-300': !isIncome,
              })}
            >
              {formatMoneyAbs(money)}
            </p>
          </div>
        </div>
      </li>
    </>
  )
}
