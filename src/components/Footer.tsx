import cx from "../helpers/cx"
import { useItems } from "./ItemsProvider"
import { commonClassName } from "./Header"
import { sumDecorator } from "../helpers/sumDecorator"
import { useMemo } from "react"
import { TypeOfItem } from "./dnd/Dnd"

export function Footer() {
    const [items] = useItems("all")

    const [outcome, income] = useMemo(function () {
        return items.reduce(function (prev, { type, sum }) {
            if (type === TypeOfItem.outcome) {
                prev[0] = prev[0] + sum
            }
            if (type === TypeOfItem.income) {
                prev[1] = prev[1] + sum
            }
            return prev
        }, [0, 0])
    }, [items])

    return (
        <footer className={cx(
            "relative",
            commonClassName,
            "border-t-4 border-line",
            "bg-main-alt",
            "sticky bottom-0",
        )}>
            <div className="flex w-full pl-7 pr-2 py-2">
                <div className="text-xl flex items-center">
                    Доходы:
                </div>
                <code className="flex-1 text-xl text-right">
                    {sumDecorator(income)}
                </code>
            </div>
            <div className="flex border-t border-line w-full pl-7 pr-2 py-2">
                <div className="text-xl flex items-center">
                    Расходы:
                </div>
                <code className="flex-1 text-xl text-right">
                    {sumDecorator(outcome)}
                </code>
            </div>
            <div className="flex border-t border-line w-full pl-7 pr-2 py-2">
                <div className="text-xl flex items-center">
                </div>
                <code className="flex-1 text-xl text-right">
                    {sumDecorator(income - outcome)}
                </code>
            </div>
        </footer>
    )
}
