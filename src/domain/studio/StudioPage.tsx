import {
  AcademicCapIcon,
  BanknotesIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

const actions = [
  {
    title: 'Plan your retirement',
    description:
      'Have you thought about your retirement? We can help you plan for it.',
    href: '/studio/retirement',
    icon: ClockIcon,
    iconForeground: 'text-teal-700 dark:text-teal-900',
    iconBackground: 'bg-teal-50 dark:bg-teal-900',
  },
  /*
  {
    title: 'Taxes',
    description: 'We can help you with your taxes.',
    href: '/advisor/taxes',
    icon: CheckBadgeIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'Schedule a one-on-one',
    description:
      'Need help with something specific? Schedule a one-on-one with one of our advisors.',
    href: '/advisor/schedule-one-on-one',
    icon: UsersIcon,
    iconForeground: 'text-sky-700',
    iconBackground: 'bg-sky-50',
  },
  {
    title: 'Payroll',
    href: '#',
    icon: BanknotesIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'Submit an expense',
    href: '#',
    icon: ReceiptRefundIcon,
    iconForeground: 'text-rose-700',
    iconBackground: 'bg-rose-50',
  },
  {
    title: 'Training',
    href: '#',
    icon: AcademicCapIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
  */
]

function ToolsPage() {
  return (
    <>
      <div className="bg-primary dark:bg-primary-darker">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Welcome to Merlin&apos;s Advisory</span>
            <span className="block text-indigo-200 dark:text-indigo-300">
              Empowering Your Wealth Management with AI
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-indigo-200 dark:text-indigo-300">
            At Merlin&apos;s Advisory, we leverage cutting-edge AI technology to
            provide you with innovative solutions for complex wealth management
            challenges. Discover how our AI-powered tools can transform your
            financial strategy and help you achieve your investment goals.
          </p>
        </div>
      </div>

      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow dark:divide-gray-700 dark:bg-gray-800 sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={`group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 dark:bg-gray-900 ${
              actionIdx === 0
                ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
                : ''
            } ${actionIdx === 1 ? 'sm:rounded-tr-lg' : ''} ${
              actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : ''
            } ${
              actionIdx === actions.length - 1
                ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
                : ''
            }`}
          >
            <div>
              <span
                className={`inline-flex rounded-lg p-2 ring-4 ring-white ${action.iconBackground} ${action.iconForeground}`}
              >
                <action.icon
                  className="h-6 w-6 text-gray-900 dark:text-gray-200"
                  aria-hidden="true"
                />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100">
                <a href={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </a>
              </h3>
              {action.description && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ToolsPage
