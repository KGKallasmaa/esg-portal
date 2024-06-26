import { ADVISOR_URL } from '../../../config/url'
import { makeRequest } from '../../../config/request'
import Message from '../../../models/message'

async function getChatMessages(id: string): Promise<Message.Message[]> {
  const path = `v1/messages/${id}`
  const url = new URL(`${ADVISOR_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function postSendMessage(chatId: string, content: string): Promise<null> {
  const payload = {
    chatId: chatId,
    content: content,
  }
  const path = `v1/messages`
  const url = new URL(`${ADVISOR_URL}/${path}`)
  return await makeRequest(url, 'POST', true, payload)
}

export const MessageClient = {
  getChatMessages,
}
