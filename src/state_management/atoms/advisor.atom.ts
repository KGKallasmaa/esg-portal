import { atom } from 'jotai'

export const advisorChatIDAtom = atom<string | null>(null)
export const webSocketConnectionStateAtom = atom<string>('not_connected')
