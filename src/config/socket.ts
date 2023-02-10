import { io } from 'socket.io-client'

const socket = io("ws://localhost:5000/", { autoConnect: false })

// SocketIO debugger serilization engine
socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket
