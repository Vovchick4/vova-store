import { useEffect, useMemo, useState } from "react"
import useSwr from "swr"
import { AxiosResponse } from "axios"
import { useParams } from 'react-router-dom'
import { Navbar, Footer } from '../../components'

import { useAuth, useUser } from "../../hooks"
import socket from "../../config/socket"
import { IUserDataProps } from "../../hooks/interfaces"

import styles from './index.module.css'
import { fetcher } from "../../main"

interface IMessege {
    id: number,
    room_id: number,
    message: string,
    nickName: string,
    from: number,
}

export default function ChatPage() {
    const { chatId } = useParams()
    const [messeges, setMesseges] = useState<IMessege[]>([])

    const currentUser = useUser()
    // const { data: currentUser } = useSwr({ url: "/auth/get-user" })
    const { data, isLoading } = useSwr<IUserDataProps | undefined>(chatId !== undefined ? { url: `/auth/get-user/${chatId}` } : null)
    const { data: roomData } = useSwr<any>(data ? { url: `/room/${data.id}` } : null, fetcher, {
        onSuccess: ({ chat }: any) => setMesseges(chat),
    })

    useEffect(() => {
        if (chatId && data && currentUser) {
            socket.auth = { owner_user_id: currentUser.id, second_user_id: chatId, room_id: roomData ? roomData.id : null }
            socket.connect()
        }

        return () => {
            socket.disconnect()
        }
    }, [data, currentUser, chatId, roomData])

    useEffect(() => {
        socket.on("private message", (data: IMessege) => {
            setMesseges(prev => [...prev, { ...data }])
        })
    }, [])

    return (
        <div className={styles.content_chat}>
            <Navbar.RoomChat findedUser={data} isLoading={isLoading} />
            <div className={styles.content_wrapper}>
                <ul className={styles.chat_content}>
                    {messeges && roomData?.chat && currentUser && messeges.map(({ id, nickName, message }) => (
                        <li className={currentUser.nickName === nickName ? `${styles.list_roomchat_content + " " + styles.active}` : styles.list_roomchat_content} key={id}>
                            <div>
                                {message}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer.RoomChat user={data} />
        </div>
    )
}


