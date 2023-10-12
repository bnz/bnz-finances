import { SwipeAction } from "react-swipeable-list"
import { useCallback } from "react"
import { Item as ItemType } from "../dnd/Dnd"
import { useItems } from "../ItemsProvider"

interface DeleteButtonProps {
    title: string
    id: string
}

export function DeleteButton({ title, id: itemId }: DeleteButtonProps) {
    const [, setItems] = useItems()
    const onClick = useCallback(function () {
        setItems(function (prevState) {
            const copy: ItemType[] = JSON.parse(JSON.stringify(prevState))
            const index = copy.findIndex(function ({ id }) {
                return id === itemId
            })
            copy.splice(index, 1)
            localStorage.setItem("data", JSON.stringify(copy))
            return copy
        })
    }, [setItems])

    return (
        <SwipeAction destructive={true} onClick={onClick} Tag="div">
            <button className="bg-red-500 text-white font-bold px-2">
                {title}
            </button>
        </SwipeAction>
    )
}
