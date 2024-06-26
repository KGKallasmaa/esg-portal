import {
  advisorChatIDAtom,
  webSocketConnectionStateAtom,
} from '../atoms/advisor.atom'
import { useAtom } from 'jotai'

const useAdvisorStore = () => {
  const [chatId, setChatId] = useAtom(advisorChatIDAtom)
  if (!chatId) {
    setChatId('123456789')
  }
  const [webSocketConnectionState, setWebSocketConnectionState] = useAtom(
    webSocketConnectionStateAtom
  )

  return {
    chatId,
    setChatId,
    webSocketConnectionState,
    setWebSocketConnectionState,
  }
}

export default useAdvisorStore
