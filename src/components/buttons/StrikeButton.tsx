import { SwipeAction } from "react-swipeable-list"
import { useCallback } from "react"
import { saveItems, useItems } from "../ItemsProvider"
import { Item as ItemType } from "../dnd/Dnd"

interface StrikeButtonProps {
    id: string
}

export function StrikeButton({ id: itemId }: StrikeButtonProps) {
    const [, save] = useItems()

    const onClick = useCallback(function () {
        // save(function (prevState) {
        //     const copy: ItemType[] = JSON.parse(JSON.stringify(prevState))
        //     const index = copy.findIndex(function ({ id }) {
        //         return id === itemId
        //     })
        //     copy[index].strike = !copy[index].strike
        //     saveItems(copy)
        //     return copy
        // })
    }, [save, itemId])

    return (
        <SwipeAction Tag="div" onClick={onClick}>
            <button className="!h-full bg-red-200 dark:bg-red-800 before:!top-0 icon strike w-24">
                Зачеркнуть
            </button>
        </SwipeAction>
    )
}
