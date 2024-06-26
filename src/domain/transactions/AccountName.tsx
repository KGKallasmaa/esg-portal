import { useGetAssetById } from '../assets/hooks/assets_hooks'

export default function AccountName({ accountId }: { accountId: string }) {
  const { data: account } = useGetAssetById(accountId)
  if (!account) return null
  // @ts-ignore
  const { label } = account?.metadata
  return formatString(label)
}

const formatString = (str) => {
  // Convert to lowercase
  let lowerCaseStr = str.toLowerCase()

  // Replace underscores with spaces
  let formattedStr = lowerCaseStr.replace(/_/g, ' ')

  // Capitalize the first letter of each word
  formattedStr = formattedStr.replace(/\b\w/g, (char) => char.toUpperCase())

  return formattedStr
}
