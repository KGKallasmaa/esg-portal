interface Tab {
  label: string
  value: string
  isCurrent: boolean
}

function Tabs({
  tabs,
  setCurrentTab,
}: {
  tabs: Tab[]
  setCurrentTab: (tabValue: any) => void
}) {
  return (
    <nav
      className="-mb-px flex space-x-2 overflow-x-auto sm:space-x-8"
      aria-label="Tabs"
    >
      {tabs.map((tab: Tab) => (
        <button
          key={tab.value}
          onClick={() => setCurrentTab(tab.value)}
          className={`whitespace-nowrap border-b-2 px-2 py-3 text-xs font-medium sm:text-sm ${
            tab.isCurrent
              ? 'border-secondary text-primary'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`}
          style={{ minWidth: '90px' }}
          aria-current={tab.isCurrent ? 'page' : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
export default Tabs
