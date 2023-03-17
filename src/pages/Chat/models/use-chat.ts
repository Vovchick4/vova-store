import axios from "axios"
import { useState, useEffect } from "react"
import socket from "../../../config/socket"
import { IUserDataProps } from "../../../zustand/store"

export interface IMessege {
    id: number,
    room_id: number,
    send_user_id: number,
    message: string,
    nickName: string,
    from: string,
}

export default function useChat(chatId: string | undefined, currentUser: IUserDataProps | null) {
    const [messeges, setMesseges] = useState<IMessege[]>([])
    const [secondUserSocketID, setSecondUserSocketID] = useState<string>("")
    console.log(socket)

    useEffect(() => {
        if (chatId !== undefined && currentUser) {
            socket.auth = { owner_user_id: currentUser.id, second_user_id: Number(chatId) }
            socket.connect()
        }

        return () => {
            setMesseges([])
            socket.disconnect()
        }
    }, [socket, currentUser, chatId])

    useEffect(() => {
        socket.on("fetchDataRoomChat", ({ chat }) => {
            setMesseges(chat)
        })

        return () => {
            setMesseges([])
            socket.off("fetchDataRoomChat")
        }
    }, [socket, setMesseges])

    useEffect(() => {
        socket.on("session", ({ userId }) => {
            // save the ID of the user
            (socket as any).userId = userId
        })

        return () => {
            socket.off("session")
        }
    }, [socket])

    // useEffect(() => {
    //     socket.on("room chat connected", async (data: { owner_user_id: number, second_user_id: number }) => {
    //         const lastMessage: IMessege | undefined = await axios.get("/room/get-last-msg/" + data.owner_user_id + "/" + data.second_user_id)
    //         if (lastMessage && messeges.find(({ id }) => id === lastMessage.id)) {
    //             setMesseges(prev => [...prev, { ...lastMessage }])
    //         }
    //     })

    //     // return () => {
    //     //     setMesseges([])
    //     //     socket.off("room chat connected")
    //     // }
    // }, [socket, setMesseges])

    // useEffect(() => {
    //     socket.on("take second user socketID", ({ socketID }: { socketID: string }) => {
    //         setSecondUserSocketID(socketID)
    //     })

    //     return () => {
    //         socket.off("take second user socketID")
    //     }
    // }, [socket, setSecondUserSocketID])

    useEffect(() => {
        socket.on("privateMessage", (data: IMessege) => {
            console.log("🚀 ~ file: ui.tsx:57 ~ socket.on ~ data", data)
            if (!messeges.find(({ id }) => id === data?.id)) {
                setMesseges(prev => [...prev, { ...data }])
            }
        })

        // return () => {
        //     socket.off("private message")
        // }
    }, [socket, setMesseges])

    useEffect(() => {
        const content_wrapper = document.getElementById("content_wrapper")
        if (content_wrapper) {
            content_wrapper.scrollTo(0, content_wrapper.scrollHeight)
        }

        return () => {
            content_wrapper?.scrollTo(0, content_wrapper.scrollHeight)
        }
    }, [messeges])

    return {
        messeges,
        secondUserSocketID
    }
}