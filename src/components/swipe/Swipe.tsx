import { SwipeableList, Type } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useItems } from "../ItemsProvider"
import { Item } from './Item'
import { commonClassName } from "../Layout"

export function Swipe() {
    const [items] = useItems()

    return (
        <SwipeableList type={Type.IOS} className={commonClassName}>
            {items.map(function ({ id, title, sum }) {
                return (
                    <Item key={id} id={id} title={title} sum={sum} />
                )
            })}
        </SwipeableList>
    )
}
