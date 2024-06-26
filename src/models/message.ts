namespace Message {
  export type Message = {
    id: string
    chatID: string
    sender: 'user' | 'system'
    senderID?: string
    content: string
    createdAt: Date
    updatedAt: Date
  }
}
export default Message
