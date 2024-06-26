import 'chart.js/auto'
import { useState } from 'react'
import CustomiseRetirementAge from './CustomiseRetirementAge'

const tabs = [
  {
    name: 'retirement-age',
    label: 'Retirement Age',
    component: <CustomiseRetirementAge />,
  },
  {
    name: 'yearly-savings',
    label: 'Yearly Savings',
  },
  {
    name: 'inflation',
    label: 'Inflation',
  },
  {
    name: 'return-rate',
    label: 'Return Rate',
  },
  {
    name: 'time-in-retirement',
    label: 'Time in Retirement',
  },
  {
    name: 'savings-start-age',
    label: 'Savings Start Age',
  },
  {
    name: 'income-in-retirement',
    label: 'Income in Retirement',
  },
  {
    name: 'full-customisation',
    label: 'Full Customisation',
  },
]

function CustomisePlanView() {
  return (
    <div className="py-10 md:px-6">
      <div className="max-w-3xl text-base leading-7">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Personalized retirement plan
        </h1>
        <div className="mt-10 max-w-2xl">
          <p>
            Sometimes the default plan doesn&apos;t fit your needs. We can help
            you customize your retirement plan to fit your preferences.
          </p>
          <CustomizationTabs />
        </div>
      </div>
    </div>
  )
}

function CustomizationTabs() {
  const tabStyles = 'p-4 w-full text-center cursor-pointer'
  const activeTabStyles = 'text-blue-500 border-b-2 border-blue-500'
  const [activeTab, setActiveTab] = useState('retirement-age')
  return (
    <div>
      <div className="flex">
        {tabs.map((tab) => {
          const { name, label } = tab
          return (
            <div
              key={name}
              className={`${tabStyles} ${
                activeTab === name ? activeTabStyles : 'text-white'
              }`}
              onClick={() => setActiveTab(name)}
            >
              {label}
            </div>
          )
        })}
      </div>
      <div className="p-2">
        {tabs.map((tab) => {
          if (tab.name === activeTab) {
            return tab.component
          }
        })}
      </div>
    </div>
  )
}
export default CustomisePlanView
