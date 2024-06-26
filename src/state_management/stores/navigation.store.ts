import { useAtom } from 'jotai/index'
import { currentPageAtom } from '../atoms/navigation.atom'

const useNavigationStore = () => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  return {
    currentPage,
    setCurrentPage,
  }
}
export default useNavigationStore
