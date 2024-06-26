import { useEffect, useState } from 'react'
import { Dialog, Switch } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import {
  useGetMySettings,
  useUpdateGeneralSettings,
} from './hooks/settings_hooks'
import Settings from '../../models/settings'
import toast from 'react-hot-toast'
import Link from 'next/link'

const secondaryNavigation = [
  { name: 'General', href: '#', icon: UserCircleIcon, current: true },
  // { name: 'Security', href: '#', icon: FingerPrintIcon, current: false },
  //{ name: 'Notifications', href: '#', icon: BellIcon, current: false },
  // { name: 'Plan', href: '#', icon: CubeIcon, current: false },
  // { name: 'Billing', href: '#', icon: CreditCardIcon, current: false },
  // { name: 'Team members', href: '#', icon: UsersIcon, current: false },
]

// https://tailwindui.com/components/application-ui/page-examples/settings-screens
export default function SettingsPage() {
  const updateGeneralSettingsMutation = useUpdateGeneralSettings({
    onSuccess: () => {
      toast.success('Settings updated')
    },
  })
  const { data: mySettings } = useGetMySettings()

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      language: 'en',
      currency: 'USD',
      dateOfBirth: new Date(),
    },
  })

  useEffect(() => {
    if (mySettings) {
      reset({
        firstName: mySettings.general.firstName,
        lastName: mySettings.general.lastName,
        language: mySettings.general.language,
        currency: mySettings.general.currency,
        dateOfBirth: mySettings.general.dateOfBirth,
      })
    }
  }, [mySettings, reset])

  const onSubmit = (d) => {
    const { firstName, lastName, language, currency, dateOfBirth } = d
    const general: Settings.General = {
      firstName: firstName,
      lastName: lastName,
      language: language,
      currency: currency,
      dateOfBirth: dateOfBirth,
    }
    updateGeneralSettingsMutation.mutate(general)
  }

  return (
    <>
      <div className="mx-auto max-w-7xl pt-1 lg:flex lg:gap-x-16 lg:px-1">
        <h1 className="sr-only">Merlin settings</h1>

        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
          <nav className="flex-none px-4 sm:px-6 lg:px-0">
            <ul
              role="list"
              className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
            >
              {secondaryNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-50 text-primary dark:bg-gray-800'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary dark:bg-gray-800',
                      'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-primary'
                          : 'text-gray-400 group-hover:text-primary',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
          <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
            <form
              className="bg-gray-900 p-4 text-white"
              onSubmit={handleSubmit(onSubmit)}
            >
              <GeneralSettings register={register} />

              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 font-bold text-white hover:bg-primary-darker"
              >
                Save Changes
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}

function GeneralSettings({ register }) {
  return (
    <>
      <h2 className="mb-4 text-xl font-semibold leading-7">Your profile</h2>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Firstname"
            {...register('firstName', {
              required: 'Please enter your first name.',
            })}
            className="block w-full rounded-none border-0 border-b border-gray-600 bg-gray-800 p-2 text-white focus:border-white focus:ring-0"
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Lastname"
            {...register('lastName', {
              required: 'Please enter your last name.',
            })}
            className="block w-full rounded-none border-0 border-b border-gray-600 bg-gray-800 p-2 text-white focus:border-white focus:ring-0"
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            placeholder="Date of Birth"
            {...register('dateOfBirth', {
              required: 'Please enter your date of birth.',
            })}
            className="block w-full rounded-none border-0 border-b border-gray-600 bg-gray-800 p-2 text-white focus:border-white focus:ring-0"
          />
        </div>
      </div>

      <h3 className="mb-4 text-lg font-semibold leading-7">Preferences</h3>

      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label htmlFor="language" className="mb-2 block text-sm font-medium">
            Language
          </label>
          <select
            id="language"
            name="language"
            {...register('language', {
              required: 'Please select a language',
            })}
            className="block w-full rounded-md border-gray-500 bg-gray-800 py-2 pl-3 pr-10 text-base text-white focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            <option value={'en'}>English 🇬🇧</option>
            <option value={'es'}>Spanish 🇪🇸</option>
            <option value={'fr'}>French 🇫🇷</option>
            <option value={'de'}>German 🇩🇪</option>
            {/* Add other language options here */}
          </select>
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label htmlFor="currency" className="mb-2 block text-sm font-medium">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            {...register('currency', {
              required: 'Please select a currency',
            })}
            className="block w-full rounded-md border-gray-500 bg-gray-800 py-2 pl-3 pr-10 text-base text-white focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            <option value={'USD'}>USD</option>
            <option value={'EUR'}>EUR</option>
            <option value={'GBP'}>GBP</option>
            <option value={'CHF'}>CHF</option>
            {/* Add other currency options here */}
          </select>
        </div>
      </div>
    </>
  )
}
