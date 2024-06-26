import NewAssetButton from '../../domain/assets/new_asset/NewAssetButton'

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-white p-4 dark:bg-gray-900">
      <div className="flex gap-4"></div>
      <NewAssetButton />
    </div>
  )
}

export default Header
