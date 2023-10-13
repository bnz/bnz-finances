import { useCallback } from "react"
import { SwipeAction } from "react-swipeable-list"
import cx from "../../helpers/cx"
import { saveItems, useItem, useItems } from "../ItemsProvider"
import { Item as ItemType } from "../dnd/Dnd"

interface FavouriteButtonProps {
    id: string
}

export function FavouriteButton({ id: itemId }: FavouriteButtonProps) {
    const [, setItems] = useItems()
    const { star } = useItem(itemId)

    const onClick = useCallback(function () {
        setItems(function (prevState) {
            const copy: ItemType[] = JSON.parse(JSON.stringify(prevState))
            const index = copy.findIndex(function ({ id }) {
                return id === itemId
            })
            copy[index].star = !copy[index].star
            saveItems(copy)
            return copy
        })
    }, [setItems, itemId])

    return (
        <SwipeAction Tag="div" onClick={onClick}>
            <button
                className={cx(
                    "!h-full bg-yellow-300 dark:bg-yellow-800 before:!top-0",
                    "icon",
                    star ? "star" : "star-empty",
                )}
            >
                Избранное
            </button>
        </SwipeAction>
    )
}
