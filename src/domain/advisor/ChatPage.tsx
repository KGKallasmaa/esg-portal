import { useEffect, useState } from 'react'
import InputBox from './Input'
import { Welcome } from './Welcome'
import { ADVISOR_URL } from '../../config/url'
import useAdvisorStore from '../../state_management/stores/advisor.store'
import { useGetChatMessages } from './hooks/message_hooks'
import Message from '../../models/message'
import { advisorWebSocket } from './socket'
import ChatMessage from './ChatMessage'

const finalMessage = 'FINAL_MESSAGE'
function ChatPage() {
  /*
  const { chatId, setChatId, webSocketConnectionState } = useAdvisorStore()
  const { data: historicChatMessages } = useGetChatMessages(chatId)
  const [socketMessages, setSocketMessages] = useState<string[]>([])

 
    const WS = advisorWebSocket()
        useEffect(() => {
            WS.onmessage = (event) => {
                console.log(event.data);
                const message = event.data
                setSocketMessages((prev) => [...prev, message]);
            };
        }, []);
    const sendNewMessage = (message: string) => {
        const payload = {"message": message, "chatId": chatId}
        console.log(JSON.stringify(payload))
        WS.send(JSON.stringify(payload));
    }
   
    if (5>4){
        WS.send("i need help with my finances");
    }

     

  let socket
  try {
    // Creating an instance of the WebSocket
    socket = new WebSocket('ws://localhost:8000/messaging')

    // Adding an event listener to when the connection is opened
    socket.onopen = (ws, event) => {
      console.log('connected')
      setWebSocketConnectionState('connected')
    }

    // Listening to messages from the server
    socket.onmessage = (event) => {
      try {
        // parse the data from string to JSON object
        const data = JSON.parse(event.data)

        // If the message is of type connect
        // set the client id
        if (data['type'] == 'connect') {
          senderId = data['id']
        } else if (data['type'] == 'disconnected') {
          // if another client get disconnected show the current client
          // that the other user left
          setWebSocketConnectionState('disconnected')
          handleShowSnackBar('Disconnected', `Client ` + data['id'])
        } else {
          // if it is a regular message add it to the array of messages.
          messages = [data, ...messages]
        }
      } catch (e) {
        console.log(event.data)
        console.error(e)
      }
    }

    socket.onerror = (event) => {
      console.log('Failed to connect to websocket')
    }

    socket.close = (event) => {
      setWebSocketConnectionState('disconnected')
      console.log('Connection closed')
    }
  } catch (e) {
    setWebSocketConnectionState('connection-failed')
    console.log('Failed to connect to websocket')
  }

  const sendNewMessage = (message: string) => {
    const payload = { message: message, chatId: chatId }
    console.log(JSON.stringify(payload))
    socket.send(JSON.stringify(payload))
  }

  return (
    <div className="flex max-w-full flex-1 flex-col">
      <div className="transition-width relative flex h-full w-full flex-1 flex-col items-stretch overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div
            className="h-full dark:bg-gray-800"
            style={{
              height: 'calc(100vh - 151px)',
            }}
          >
            <ShowChatMessages
              historicChatMessages={historicChatMessages || []}
              currentChatContent={socketMessages}
            />
          </div>
        </div>
        <div className="md:bg-vert-light-gradient  bottom-20 left-0 w-full border-t bg-white pt-2 dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent">
          <InputBox
            sendMessage={(message) => sendNewMessage(message)}
            placeholder={'How can I help you?'}
          />
          <div className="px-3 pb-3 pt-2 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pb-6 md:pt-3">
            <span>For educational purposes only. Not financial advise</span>
          </div>
        </div>
      </div>
    </div>
  )
  */
  return <div>hi</div>
}

function ShowChatMessages({
  historicChatMessages,
  currentChatContent,
}: {
  historicChatMessages: Message.Message[]
  currentChatContent: string[]
}) {
  if (historicChatMessages.length === 0 && currentChatContent.length === 0) {
    return <Welcome />
  }
  // render the historic chat messages
  // build current chat content
  return (
    <div className="flex flex-col gap-2 p-4 md:p-6">
      {historicChatMessages.map((message) => (
        <ChatMessage message={message} key={message.id} />
      ))}
      {currentChatContent.map((message, index) => (
        <ChatMessage
          message={{
            chatID: 'hello',
            createdAt: new Date(),
            updatedAt: new Date(),
            id: `${finalMessage}-${index}`,
            sender: 'system',
            content: message,
          }}
          key={`${finalMessage}-${index}`}
        />
      ))}
    </div>
  )
}

export default ChatPage
