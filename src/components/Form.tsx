import { FormEvent, useCallback, useState } from "react"
import { makeId } from "../helpers/makeId"
import cx from "../helpers/cx"
import { commonClassName } from "./Header"
import { DataItem } from "../helpers/fetch"

interface AddFormProps {
    setData(item: DataItem): void
    onCancel?(): void
    defaultValues?: {
        title: string
        sum: number
        color: string | null
    }
}

const colors = [
    null,
    "after:bg-red-500",
    "after:bg-blue-500",
    "after:bg-green-500",
    "after:bg-yellow-500",
]

export function Form({ setData, onCancel, defaultValues }: AddFormProps) {
    const [title, setTitle] = useState(defaultValues?.title || "")
    const [sum, setSum] = useState(defaultValues?.sum || 0)
    const [color, setColor] = useState<string | null>(defaultValues?.color || null)

    const onSubmit = useCallback(function OnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setData({ id: makeId(), title, sum, color })
    }, [title, sum, setData, color])

    return (
        <>
            <div className={cx(
                "px-5 pt-3 bg-[var(--form-background)]",
                commonClassName,
                "flex gap-3",
                defaultValues ? "" : "rounded-t mt-2",
            )}>
                {colors.map(function (colorBg, index) {
                    return (
                        <button key={index} className={cx(
                            "w-10 h-10 relative rounded",
                            "after:absolute after:inset-0 after:rounded",
                            colorBg ? colorBg : "",
                            color === colorBg && "outline outline-2",
                        )} onClick={function () {
                            setColor(colorBg)
                        }} />
                    )
                })}
            </div>
            <form
                onSubmit={onSubmit}
                className={cx(
                    "grid grid-cols-2",
                    "md:flex md:justify-end md:flex-row",
                    "p-5 gap-3",
                    commonClassName,
                    "bg-[var(--form-background)]",
                    "rounded-b mb-2",
                )}
            >
                <input type="text" className="input col-span-2" placeholder="название"
                    autoFocus
                    required
                    defaultValue={title}
                    onChange={function TitleOnChange(e) {
                        setTitle(e.target.value)
                    }}
                />
                <input type="number" className="input col-span-2" placeholder="сумма"
                    min={0.00}
                    step={0.01}
                    max={100000.00}
                    defaultValue={sum}
                    onChange={function SumOnChange(e) {
                        setSum(Number(e.target.value))
                    }}
                />
                <button type="submit" className="button order-2 md:order-1">
                    {defaultValues ? "Сохранить" : "Добавить"}
                </button>
                {onCancel ? (
                    <button type="button" className="order-1 md:order-2" onClick={onCancel}>
                        Отмена
                    </button>
                ) : (
                    <div className="order-1 md:order-2" />
                )}
            </form>
        </>
    )
}
