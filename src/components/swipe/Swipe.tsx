import { SwipeableList, Type } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useItems } from "../ItemsProvider"
import { SwipeItem } from './SwipeItem'

import { commonClassName } from "../Header"

export function Swipe() {
    const [items] = useItems()

    return (
        <SwipeableList type={Type.IOS} className={commonClassName}>
            {items.map(function ({ id, title, sum, color }) {
                return (
                    <SwipeItem key={id} itemId={id} title={title} sum={sum} color={color} />
                )
            })}
        </SwipeableList>
    )
}
