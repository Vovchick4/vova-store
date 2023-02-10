import { useMemo } from 'react'
import { MdDelete } from "react-icons/md"
import { GrFormClose } from "react-icons/gr"
import RoomChatSidebar from './RoomChatSidebar'

import { BsFillPatchPlusFill, BsFillPatchMinusFill } from 'react-icons/bs'
import { cart, visibleSidebar, toggleVisibilitySidebar, totalCartSuma, incrementCartItemCount, decrementCartItemCount, clearCart, deleteCartItemById } from "../../zustand/store"
import styles from "./index.module.css"

export default function Sidebar() {
    const dataCart = cart()
    const visibilitySideBar = visibleSidebar()
    const toggleIsSideBar = toggleVisibilitySidebar()
    const incrementCartItem = incrementCartItemCount()
    const decrementCartItem = decrementCartItemCount()
    const clearCartItem = clearCart()
    const deleteCartItemByIdItem = deleteCartItemById()
    const totalSuma = totalCartSuma()
    const classesSidebar = useMemo(() => {
        const clss = [styles["aside"]]
        if (visibilitySideBar) {
            clss.push(styles.active)
        }
        return clss.join(" ")
    }, [visibilitySideBar])

    return (
        <aside className={classesSidebar}>
            <div className={styles.sidebar_controls}>
                <button onClick={toggleIsSideBar}><GrFormClose size={34} /></button>
            </div>

            <div className={styles.layout_cart}>
                {dataCart.length === 0 && <span>NotHaveCartEMPTY</span>}
                {dataCart.length > 0 &&
                    <div className={styles.layout_cart_onscroll}>
                        {dataCart.map(cart => (
                            <div key={cart.id} className={styles.cart_item}>
                                <div className={styles.image_content}>
                                    <img src={cart.img} alt={cart.desc} />
                                </div>
                                <div className={styles.desc}>
                                    <p>{cart.name}</p>
                                    <div className={styles.flex_centered}>
                                        <button onClick={() => decrementCartItem(cart.id)}><BsFillPatchMinusFill className={styles.icons} /></button>
                                        <span>{cart.count}</span>
                                        <button onClick={() => incrementCartItem(cart.id)}><BsFillPatchPlusFill className={styles.icons} /></button>
                                    </div>
                                    <span>{cart.count && cart.price * cart.count}$</span>
                                    <button onClick={() => deleteCartItemByIdItem(cart.id)}><MdDelete className={styles.icons} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>

            <div className={styles.flex_between}>
                <p>Total Suma: </p>
                <p>{totalSuma}$</p>
                <button onClick={clearCartItem}>ClearCart</button>
            </div>
            <button className={styles.button_centered}>CreateOrder</button>
        </aside>
    )
}

Sidebar.RoomChat = RoomChatSidebar