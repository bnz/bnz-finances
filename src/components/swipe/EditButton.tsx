import cx from "../../helpers/cx"
import { SwipeAction } from "react-swipeable-list"

interface EditButtonProps {
    title: string
    onClick(): void
}

export function EditButton({ title, onClick }: EditButtonProps) {
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
