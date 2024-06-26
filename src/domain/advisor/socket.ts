import { ADVISOR_URL } from '../../config/url'

export function advisorWebSocket() {
  const url = ADVISOR_URL.replace('http://', '').replace('https://', '')
  return new WebSocket(`ws://${url}/v1/advisor/chat/ws`)
}
