import { useEffect, useState } from "react"
import { FiSend } from "react-icons/fi"
import socket from "../../../config/socket";
import { IUserDataProps } from "../../../hooks/interfaces";
import styles from "./index.module.css"

export default function RoomChatFooter({ user, userNickname, socketId }: { user: IUserDataProps | undefined | null, userNickname: string, socketId: string }) {
    const [message, setMessage] = useState<string>("")

    const onMessage = () => {
        if (user && message) {
            socket.emit("privateMessage", {
                message,
                nickName: userNickname,
                to: user.sokcetId,
            });
            setMessage("")
            //   this.selectedUser.messages.push({
            //     content,
            //     fromSelf: true,
            //   });
        }
    }

    const onKeyDown = (event: KeyboardEvent) => {
        switch (event.code) {
            case "Enter":
                onMessage()
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown)

        return () => {
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [onMessage])

    return (
        <div className={styles.roomchat_footer}>
            <div className={styles.roomchat_inputcontent}>
                <label htmlFor="text">
                    <input id="text" placeholder="Let's sent some message!" value={message} onChange={(e) => setMessage(e.target.value)} autoComplete="off" />
                    <button className={styles.roomchat_inputcontent__fisendicon} onClick={onMessage}>
                        <FiSend size={34} color="#ffff" />
                    </button>
                </label>
            </div>
        </div>
    )
}
