import { io, Socket } from 'socket.io-client'
import { IMessege } from '../pages/Chat/models/use-chat'

export interface IServerToClientEvents {
    roomChatConnected: ({ owner_user_id, second_user_id }: { owner_user_id: number, second_user_id: number }) => void
    session: ({ userId }: { userId: string }) => void
    fetchDataRoomChat: ({ chat }: { chat: IMessege[] }) => void
    privateMessage: (callback: any) => void
}

export interface IClientToServerEvents {
    privateMessage: ({
        message,
        nickName,
        to
    }: {
        message: string
        nickName: string
        to: string
    }) => void
}

const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io("ws://localhost:5000/", { autoConnect: false })

// SocketIO debugger serilization engine
socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket
