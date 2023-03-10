import useSwr from "swr"
import { FC, useState } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { Link, useParams } from "react-router-dom"
import styles from "./index.module.css"
import { IUserDataProps } from "../../../hooks/interfaces"
import urls from "../../../config/urls"
import { user } from "../../../zustand/store"

export interface IFriend {
    id: number
    owner_user_id: number
    invated_friend_id: number
    accepted_friend: string | null
    owner_user: IUserDataProps
    invated_friend: IUserDataProps
}

export interface IGetFriendProps {
    friends: IFriend[]
    not_accepted_friends: IFriend[]
}

const CategoryHeader: FC<{ name: string, children: any }> = ({ name, children }) => {
    return (
        <li className={styles.category_list}>
            <p>{name}</p>
            {children}
        </li>
    )
}

const ListUsers: FC<{ id: number, chatId: string | undefined, nickName: string, }> = ({ id, chatId, nickName }) => {
    return (
        <li>
            <Link className={chatId === id?.toString() ? `${styles.list} ${styles.active}` : styles.list} to={urls.chat + `/${id}`}>
                <div className={styles.list_avatar_content}>
                    <img src="data:image/jpeg;base64,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" alt="UserAvatar" />
                    <span>Online or 8 members</span>
                </div>
                <div className={styles.list_last_message}>
                    <p>{nickName}</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum rem quasi, similique nihil iure ratione sint obcaecati incidunt dolore quia accusamus tempore consequuntur, fugit consectetur itaque recusandae, nam distinctio animi?</p>
                </div>
                <span className={styles.list_notification}>
                    83
                </span>
            </Link>
        </li>
    )
}

export default function RoomChatSidebar() {
    const { chatId } = useParams()

    const [searchText, setSearchText] = useState("")
    const currentUser = user()
    const { data: userData, isLoading } = useSwr<IUserDataProps[]>(searchText ? { url: `/auth/search-user?searchText=${searchText}` } : null)
    const { data: room_chats, isLoading: room_chats_is_load } = useSwr<IGetFriendProps>({ url: "/friend/" })

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const text = e.target.value.trim().toLowerCase()
        setSearchText(text)
    }

    return (
        <aside className={styles.aside_roomchat}>
            <div className={styles.container_serchbox}>
                <label htmlFor="text">
                    <input id="text" type="text" name="text" placeholder="Try find some roomchat" onChange={onSearch} autoComplete="off" />
                    <BiSearchAlt className={styles.search_icon} />
                </label>
            </div>
            <ul className={styles.list_content_main}>
                {searchText && userData && userData.length !== 0 && (
                    <CategoryHeader name="search">
                        <ul className={styles.list_content}>
                            {userData.map(user => (
                                <ListUsers key={user.id} chatId={chatId} {...user} />
                            ))}
                        </ul>
                    </CategoryHeader>
                )}
                {room_chats && Object.entries(room_chats).map(([category, friends]) => (
                    friends.length !== 0 &&
                    <CategoryHeader key={category} name={category}>
                        <ul className={styles.list_content}>
                            {friends.map((friend: IFriend) => {
                                const userData = currentUser?.id === friend.invated_friend_id ? friend.owner_user : friend.invated_friend
                                return <ListUsers key={friend.id} chatId={chatId} {...userData} />
                            })}
                        </ul>
                    </CategoryHeader>
                ))}
                {currentUser &&
                    <CategoryHeader name={"My_Messeges"}>
                        <ul className={styles.list_content}>
                            <ListUsers chatId={chatId} {...currentUser} />
                        </ul>
                    </CategoryHeader>}
            </ul>
        </aside>
    )
}

