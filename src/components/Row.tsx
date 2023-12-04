import { forwardRef } from "react"
import cx from "../helpers/cx"
import { sumDecorator } from "../helpers/sumDecorator"
import { useItem } from "./ItemsProvider"

interface RowProps {
    id: string
    className?: string
}

export const gridRowClassNames: string = "grid grid-cols-[1fr_150px] gap-2"

export const Row = forwardRef<HTMLDivElement, RowProps>(function ({ id, className }, ref) {
    const { title, sum, color, strike, star } = useItem(id)

    return (
        <div ref={ref} className={cx(
            className,
            "flex border-t border-line w-full pl-7 pr-2 py-2",
            "relative",
            "after:absolute after:top-0.5 after:left-0 after:bottom-0.5",
            "after:rounded-r",
            "after:block after:w-1.5",
            color ? color : "",
        )}>
            {star && (
                <div className={cx(
                    "absolute left-2.5 top-0 bottom-0",
                    "w-4",
                    "bg-[url('../public/assets/star-yellow.svg')]",
                    "bg-contain bg-center bg-no-repeat",
                )} />
            )}
            <div className={cx("text-xl flex items-center", strike && "line-through italic text-alt")}>
                {title}
            </div>
            <code className={cx("flex-1 text-xl text-right", strike && "line-through italic text-alt")}>
                {sumDecorator(sum)}
            </code>
        </div>
    )
})
