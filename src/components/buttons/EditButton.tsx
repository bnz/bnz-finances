import cx from "../../helpers/cx"
import { SwipeAction } from "react-swipeable-list"
import { Dispatch, SetStateAction, useCallback } from "react"
import { useToggles } from "../TogglesProvider"

interface EditButtonProps {
    id: string
    title: string
}

export function EditButton({ id: itemId, title }: EditButtonProps) {
    const [, setEdit] = useToggles("edit")

    const onClick = useCallback(function () {
        (setEdit as Dispatch<SetStateAction<string | null>>)(function () {
            return itemId
        })
    }, [setEdit, itemId])

    return (
        <SwipeAction onClick={onClick} Tag="div">
            <button className={cx(
                "bg-blue-500 text-white font-bold",
                "px-2",
            )}>
                {title}
            </button>
        </SwipeAction>
    )
}
