import { SwipeableList, Type } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useItems } from "../ItemsProvider"
import { SwipeItem } from './SwipeItem'

import { commonClassName } from "../Header"
import { useToggle } from '../TogglesProvider';

export function Swipe() {
    const [items] = useItems()
    const addNew = useToggle("addNew")

    if (items.length === 0 && !addNew) {
        return (
            <div className="text-center py-4">
                пусто
            </div>
        )
    }

    return (
        <SwipeableList type={Type.IOS} className={commonClassName}>
            {items.map(function ({ id }) {
                return (
                    <SwipeItem key={id} itemId={id} />
                )
            })}
        </SwipeableList>
    )
}
