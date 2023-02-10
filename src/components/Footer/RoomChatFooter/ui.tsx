import { useState } from "react"
import { FiSend } from "react-icons/fi"
import socket from "../../../config/socket";
import { IUserDataProps } from "../../../hooks/interfaces";
import styles from "./index.module.css"

export default function RoomChatFooter({ user }: { user: IUserDataProps | undefined }) {
    const [message, setMessage] = useState<string>("")

    const onMessage = () => {
        if (user) {
            socket.emit("private message", {
                message,
                nickName: user.nickName,
                to: user.id,
            });
            setMessage("")
            //   this.selectedUser.messages.push({
            //     content,
            //     fromSelf: true,
            //   });
        }
    }

    return (
        <div className={styles.roomchat_footer}>
            <div className={styles.roomchat_inputcontent}>
                <label htmlFor="text">
                    <textarea id="text" placeholder="Let's sent some message!" onChange={(e) => setMessage(e.target.value)}></textarea>
                    <button className={styles.roomchat_inputcontent__fisendicon} onClick={onMessage}>
                        <FiSend size={34} color="#ffff" />
                    </button>
                </label>
            </div>
        </div>
    )
}
