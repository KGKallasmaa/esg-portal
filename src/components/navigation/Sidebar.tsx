import classNames from 'classnames'
import Link from 'next/link'
import { BiCog, BiLogOut } from 'react-icons/bi'
import Logo from '../Logo'

type SidebarProps = {
  isOpenOnMobile?: boolean
}

// TODO: use loading
export default function Sidebar(props: SidebarProps) {
  const handleLogoClick = () => {
    window.location.href = '/'
  }
  // 'bg-primary dark:bg-gray-900 lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col',

  return (
    <div
      className={classNames(
        'bg-primary lg:fixed lg:inset-y-0  lg:flex lg:w-64 lg:flex-col',
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

      {/* Bottom Section: User log out  */}
      <div className="-mx-4 mb-2 mt-auto">
        <div>
          <Link
            href="/settings"
            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900"
          >
            <BiCog className="h-7 w-7 text-white" />
            <span className="text-white hover:underline">Settings</span>
          </Link>
        </div>
        <Link
          href="/logout"
          className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 "
        >
          <BiLogOut className="h-7 w-7 text-white" />

          <span className="sr-only">Log out</span>
          <span className="text-white hover:underline" aria-hidden="true">
            Logout
          </span>
        </Link>
      </div>
    </div>
  )
}
