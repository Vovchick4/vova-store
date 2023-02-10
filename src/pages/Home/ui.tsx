import useSWR from 'swr'
import { useState, useMemo, FC, ReactElement, JSXElementConstructor } from 'react'
// import Draggable from 'react-draggable'
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd'
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"

import { getItems } from '../../api'
import { searchText, beloved, favorites, addToCart, removeItemFromColumn, addItemToColumn, Filter, ICartItemProps, } from '../../zustand/store'

import styles from './index.module.css'

const Accardion: FC<{ children: any, dataLength?: number, type: string, snapshot: any }> = ({ children, dataLength, type, snapshot }) => {
    const [isOpen, setIsOpen] = useState(false)

    const formatedTitle = type[0].toUpperCase() + type.slice(1)
    const classesAccardion = useMemo(() => {
        const clss = [styles["accardion"]]

        if (isOpen || snapshot.isDraggingOver) {
            clss.push(styles.active)
        }

        return clss.join(" ")
    }, [isOpen, snapshot.isDraggingOver])

    function toggleAccardion() {
        setIsOpen(prev => !prev)
    }

    return (
        <div className={classesAccardion} >
            <button onClick={toggleAccardion}>
                <span>{formatedTitle}</span>
                <span>
                    {dataLength}
                    {isOpen ? <AiOutlineDown size={25} /> : <AiOutlineUp size={25} />}
                </span>
            </button>
            <div className={styles.accardion_list} style={isOpen || snapshot.isDraggingOver ? { height: 170.4 * 2 } : { height: 0 }}>
                {children}
            </div>
        </div>
    )
}

const CartItem: FC<ICartItemProps & { isDraggable?: boolean }> = ({ id, name, desc, img, price, isDraggable }) => {
    const add = addToCart()

    const classesCartItems = [styles["card_item"]]
    if (isDraggable) {
        classesCartItems.push(styles.draggable)
    }

    return (
        <div className={classesCartItems.join(" ")}>
            <div>
                <div className={styles.card_item_image}>
                    <img src={img} alt={name} />
                </div>
                {/* <p className={styles.card_item_price}>
                    Price: {price}$
                </p> */}
            </div>
            <div className={styles.card_item_desc}>
                <p>{name}</p>
                <p>{desc}</p>
            </div>
            <div className={styles.card_item_controls}>
                <p className={styles.card_item_price}>
                    Price: {price}$
                </p>
                <button onClick={() => add({ id, name, desc, img, price })}>AddToCart</button>
            </div>
        </div>
    )
}

const Column: FC<{ data: ICartItemProps[], type: string, droppableId: Filter }> = ({ data, type, droppableId }) => {
    const removeItem = removeItemFromColumn()
    // const removeItemFIlterFn = removeFilterItems()

    return (
        <Droppable droppableId={droppableId} type={type}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Accardion type={`${droppableId}`} dataLength={data.length} snapshot={snapshot}>
                        {data.map((cartItem: ICartItemProps) => (
                            <div key={cartItem.id} className={styles.accardion_cart_item}>
                                <div className={styles.accardion_cart_item_img}>
                                    <img src={cartItem.img} alt={cartItem.name} />
                                </div>
                                <div className={styles.accardion_cart_item_text}>
                                    <p>{cartItem.name}</p>
                                    <button onClick={() => removeItem(droppableId, cartItem.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </Accardion>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}

export default function HomePage() {
    const searchTextFromNavbar = searchText()
    const { data, isLoading, error } = useSWR<ICartItemProps[]>({ url: "items" })

    const dataBeloved = beloved()
    const dataFavorites = favorites()
    const addToColumn = addItemToColumn()
    // const dataCart = items()
    // const setFilteItems = setNewFilterItem()

    function handleOnDragEnd(result: any) {
        if (!result.destination || result.destination.droppableId === "Carts" || !data) return;
        const findedData = data.find(d => d.id.toString() === result.draggableId)
        if (findedData)
            addToColumn(result.destination.droppableId, findedData)
        // setFilteItems({ id: result.draggableId, filter: result.destination.droppableId });
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            {isLoading && <span>Loading...</span>}
            <div className={styles.layout}>
                {!isLoading && (
                    <Droppable droppableId='Carts' type='Carts'>
                        {(provided) =>
                        (<div ref={provided.innerRef} {...provided.droppableProps} className={styles.content_card} >
                            {!isLoading && data && data
                                // .filter(cartItem =>
                                //     cartItem.name.toLocaleLowerCase().trim()
                                //         .includes(searchTextFromNavbar.toLocaleLowerCase()))
                                .map((cartItem, index: number) => (
                                    <Draggable key={cartItem.id} draggableId={cartItem.id.toString()} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <CartItem {...cartItem} isDraggable={snapshot.isDragging} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                        </div>)}
                    </Droppable>
                )}
                <div className={styles.sidebar}>
                    <Column droppableId={Filter.beloved} type='Carts' data={dataBeloved} /*data={dataCart.filter(dtCr => dtCr.filter === "Beloved")}*/ />
                    <Column droppableId={Filter.favorites} type='Carts' data={dataFavorites} /*data={dataCart.filter(dtCr => dtCr.filter === "Favorites")}*/ />
                </div>
            </div>
        </DragDropContext>
    )
}
