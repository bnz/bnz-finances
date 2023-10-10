import { forwardRef } from "react"
import cx from "../helpers/cx"
import { sumDecorator } from "../helpers/sumDecorator"

interface RowProps {
    title: string
    sum: number
    className?: string
    Tag?: 'div' | 'footer'
}

export const gridRowClassNames: string = "grid grid-cols-[1fr_150px] gap-2"

export const Row = forwardRef<HTMLDivElement, RowProps>(function ({ title, sum, className, Tag = "div" }, ref) {
    return (
        <Tag ref={ref} className={cx(
            className,
            "flex border-t border-[var(--line-color)] w-full px-2 py-2",
        )}>
            <div className="text-xl flex items-center">{title}</div>
            <code className="flex-1 text-xl text-right">
                {sumDecorator(sum)}
            </code>
        </Tag>
    )
})
