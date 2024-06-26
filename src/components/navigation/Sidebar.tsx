import Link from 'next/link'
import classNames from 'classnames'
import { BiCog, BiLogOut } from 'react-icons/bi'
import Logo from '../Logo'
import {
  BanknotesIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon,
  ChartPieIcon,
  CakeIcon,
} from '@heroicons/react/24/outline'
import useNavigationStore from '../../state_management/stores/navigation.store'
import { useEffect, useState } from 'react'
import SubscribeButton from '../../domain/subscription/SubscribeButton'

type SidebarProps = {
  isOpenOnMobile?: boolean
}

// TODO: use loading
export default function Sidebar(props: SidebarProps) {
  const { currentPage, setCurrentPage } = useNavigationStore()

  const handleLogoClick = () => {
    setCurrentPage('')
    window.location.href = '/'
  }
  // 'bg-primary dark:bg-gray-900 lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col',

  return (
    <div
      className={classNames(
        'bg-gradient-to-r from-gray-400 to-gray-400 dark:from-gray-950 dark:to-gray-900 lg:fixed lg:inset-y-0  lg:flex lg:w-64 lg:flex-col',
        {
          hidden: !props.isOpenOnMobile,
        }
      )}
    >
      {/* Top Section: Logo  */}
      <div className="flex items-center justify-between border-b border-secondary px-6 py-4 dark:border-primary">
        <button onClick={handleLogoClick}>
          <Logo className="h-8 w-8" />
        </button>
      </div>

      <PortfolioMenu />
      {5 > 6 && <StudioMenu />}

      <div className="ml-2 mt-2">
        <div className="flex items-center">
          <BanknotesIcon className="h-5 w-5" />
          <Link
            aria-placeholder={'View your cashflow insights'}
            className={classNames('ml-2 text-white hover:text-primary', {
              'text-primary': shouldHighlightPage(currentPage, 'cashflow'),
            })}
            href={`/cashflow`}
          >
            Budget
          </Link>
        </div>
      </div>

      {/* Bottom Section: User log out  */}
      <div className="-mx-4 mb-2 mt-auto">
        {5 > 6 && <SubscribeButton />}

        <div>
          <Link
            href="/settings"
            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900"
          >
            <BiCog className="h-7 w-7 text-white hover:text-primary" />
            <span className="text-white hover:text-primary">Settings</span>
          </Link>
        </div>
        <Link
          href="/logout"
          className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 "
        >
          <BiLogOut className="h-7 w-7 text-white" />

          <span className="sr-only">Log out</span>
          <span className="text-white hover:text-primary" aria-hidden="true">
            Logout
          </span>
        </Link>
      </div>
    </div>
  )
}

function PortfolioMenu() {
  const portfolioPages = ['portfolio', 'accounts', 'securities']
  const { currentPage, setCurrentPage } = useNavigationStore()
  const [isAssetsDropdownOpen, setIsAssetsDropdownOpen] = useState(false)

  useEffect(() => {
    if (currentPage !== '' && portfolioPages.includes(currentPage)) {
      setIsAssetsDropdownOpen(true)
    }
  }, [currentPage, portfolioPages])

  const toggleAssetsDropdown = () => {
    setIsAssetsDropdownOpen(!isAssetsDropdownOpen)
  }

  return (
    <div className="ml-2 mt-2">
      <button
        className="flex w-full items-center justify-between"
        onClick={toggleAssetsDropdown}
      >
        <span className="flex items-center">
          <ChartPieIcon className="h-5 w-5" />
          <span
            className={classNames('ml-2 text-white hover:text-primary', {
              'text-primary': isAssetsDropdownOpen,
            })}
          >
            Portfolio
          </span>
        </span>
        {isAssetsDropdownOpen ? (
          <ChevronUpIcon className="mr-5 h-5 w-5" />
        ) : (
          <ChevronDownIcon className="mr-5 h-5 w-5" />
        )}
      </button>
      {isAssetsDropdownOpen && (
        <div className="ml-6 flex flex-col">
          <Link
            href="/portfolio/securities"
            className={classNames('py-1 text-white hover:text-primary', {
              'text-primary': shouldHighlightPage(currentPage, 'securities'),
            })}
          >
            Stocks
          </Link>
          <Link
            href="/portfolio/accounts"
            className={classNames('py-1 text-white hover:text-primary', {
              'text-primary': shouldHighlightPage(currentPage, 'accounts'),
            })}
          >
            Accounts
          </Link>
        </div>
      )}
    </div>
  )
}

function StudioMenu() {
  const toolPages = ['tools', 'retirement', 'taxes', 'schedule-one-on-one']
  const { currentPage, setCurrentPage } = useNavigationStore()
  const [isAdvisorDropdownOpen, setIsAdvisorDropdownOpen] = useState(false)

  useEffect(() => {
    if (currentPage !== '' && toolPages.includes(currentPage)) {
      setIsAdvisorDropdownOpen(true)
    }
  }, [currentPage, toolPages])

  const toggleToolDropdown = () => {
    setIsAdvisorDropdownOpen(!isAdvisorDropdownOpen)
  }

  return (
    <div className="ml-2 mt-2">
      <button
        className="flex w-full items-center justify-between"
        onClick={toggleToolDropdown}
      >
        <span className="flex items-center">
          <SparklesIcon className="h-5 w-5" />
          <span
            className={classNames('ml-2 text-gray-400', {
              'text-white': isAdvisorDropdownOpen,
            })}
          >
            Studio
          </span>
        </span>
        {isAdvisorDropdownOpen ? (
          <ChevronUpIcon className="mr-5 h-5 w-5" />
        ) : (
          <ChevronDownIcon className="mr-5 h-5 w-5" />
        )}
      </button>
      {isAdvisorDropdownOpen && (
        <div className="ml-6 flex flex-col">
          <Link
            href="/studio"
            className={classNames('py-1', {
              'text-white': shouldHighlightPage(currentPage, 'retirement'),
            })}
          >
            All Tools
          </Link>
          <Link
            href="/studio/retirement"
            className={classNames('py-1', {
              'text-white': shouldHighlightPage(currentPage, 'retirement'),
            })}
          >
            Retirement
          </Link>
        </div>
      )}
    </div>
  )
}

function AdvisorMenu() {
  const advisorPages = ['goals', 'chat']
  const { currentPage, setCurrentPage } = useNavigationStore()
  const [isAdvisorDropdownOpen, setIsAdvisorDropdownOpen] = useState(false)

  useEffect(() => {
    if (currentPage !== '' && advisorPages.includes(currentPage)) {
      setIsAdvisorDropdownOpen(true)
    }
  }, [currentPage, advisorPages])

  const toggleToolDropdown = () => {
    setIsAdvisorDropdownOpen(!isAdvisorDropdownOpen)
  }

  return (
    <div className="ml-2 mt-2">
      <button
        className="flex w-full items-center justify-between"
        onClick={toggleToolDropdown}
      >
        <span className="flex items-center">
          <SparklesIcon className="h-5 w-5" />
          <span
            className={classNames('ml-2 text-gray-400', {
              'text-white': isAdvisorDropdownOpen,
            })}
          >
            Advisor
          </span>
        </span>
        {isAdvisorDropdownOpen ? (
          <ChevronUpIcon className="mr-5 h-5 w-5" />
        ) : (
          <ChevronDownIcon className="mr-5 h-5 w-5" />
        )}
      </button>
      {isAdvisorDropdownOpen && (
        <div className="ml-6 flex flex-col">
          <Link
            href="/advisor/goals"
            className={classNames('py-1', {
              'text-white': shouldHighlightPage(currentPage, 'retirement'),
            })}
          >
            Goals
          </Link>
          <Link
            href="/advisor/chats"
            className={classNames('py-1', {
              'text-white': shouldHighlightPage(currentPage, 'retirement'),
            })}
          >
            Chats
          </Link>
        </div>
      )}
    </div>
  )
}

function shouldHighlightPage(currentPage: string, page: string): boolean {
  return currentPage === page
}
