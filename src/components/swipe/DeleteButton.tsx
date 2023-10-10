import { SwipeAction } from "react-swipeable-list"
import cx from "../../helpers/cx"

interface DeleteButtonProps {
    title: string
    onClick(): void
}

export function DeleteButton({ title, onClick }: DeleteButtonProps) {
    return (
        <SwipeAction destructive={true} onClick={onClick} Tag="div">
            <button className={cx(
                "bg-red-500 text-white font-bold",
                "px-2",
            )}>
                {title}
            </button>
        </SwipeAction>
    )
}
