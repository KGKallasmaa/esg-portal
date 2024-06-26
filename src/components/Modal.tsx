import classNames from 'classnames'

import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Modal({
  title,
  titleColor,
  backgroundColor,
  border,
  children,
  closable,
  onClose,
}: {
  title?: string
  titleColor?: string
  backgroundColor: string
  border?: string
  children: React.ReactNode
  closable?: boolean
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center backdrop-blur-sm">
      <div
        onClick={() => onClose()}
        className="fixed inset-0 bg-gray-900 opacity-75"
      />

      <div
        className={classNames(
          'md:top-20vh relative w-full rounded-md p-1 shadow-lg dark:bg-gray-800 md:top-16 md:h-fit md:max-w-2xl md:p-4',
          backgroundColor,
          border
        )}
      >
        <div className="mb-2 flex h-12 items-center justify-center">
          {title !== undefined && (
            <h1
              className={classNames(
                'mt-5 flex text-center text-2xl font-semibold',
                titleColor
              )}
            >
              {title}
            </h1>
          )}
        </div>
        <button
          onClick={onClose}
          className="absolute right-0 top-0 rounded-full p-2 transition-colors hover:bg-gray-200 focus:bg-gray-200 dark:hover:bg-gray-500"
        >
          {closable && (
            <XMarkIcon className="h-5 w-5 text-gray-900 dark:text-white" />
          )}
        </button>
        <div className="max-h-[80vh] overflow-y-auto px-4 pb-8 md:h-fit md:px-2 md:pb-0">
          {children}
        </div>
      </div>
    </div>
  )
}
