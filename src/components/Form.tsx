import { FormEvent, useCallback, useState } from "react"
import { makeId } from "../helpers/makeId"
import cx from "../helpers/cx"
import { commonClassName } from "./Header"
import { DataItem } from "../helpers/fetch"
import { useToggle } from "./TogglesProvider"
import { TypeOfItem } from "./dnd/Dnd"

interface DefaultValues {
    title: string
    sum: number
    color: string | null
    star?: boolean
    strike?: boolean
}

interface AddFormProps {
    setData(item: DataItem): void
    onCancel?(): void
    defaultValues?: DefaultValues
}

const colors = [
    null,
    "after:bg-red-500",
    "after:bg-blue-500",
    "after:bg-green-500",
    "after:bg-yellow-500",
]

export function Form({ setData, onCancel, defaultValues }: AddFormProps) {
    const type = useToggle("type")

    const [{ title, sum, color, strike, star }, setTempData] = useState<DefaultValues>({
        title: defaultValues?.title || "",
        sum: defaultValues?.sum || 0,
        color: defaultValues?.color || null,
        star: defaultValues?.star || false,
        strike: defaultValues?.strike || false,
    })

    const onSubmit = useCallback(function OnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setData({ id: makeId(), title, sum, color, star, strike })
    }, [title, sum, setData, color, star, strike])

    const bgClassName = type === TypeOfItem.income
        ? "bg-[var(--form-background-income)]"
        : "bg-[var(--form-background-outcome)]"

    return (
        <>
            <div className={cx(
                "px-5 pt-3 flex gap-3",
                bgClassName,
                commonClassName,
                defaultValues ? "" : "rounded-t mt-2",
            )}>
                {colors.map(function (colorBg, index) {
                    return (
                        <button
                            key={index}
                            onClick={function () {
                                setTempData(function (prevState) {
                                    return { ...prevState, color: colorBg }
                                })
                            }}
                            className={cx(
                                "w-10 h-10 relative rounded",
                                "after:absolute after:inset-0 after:rounded",
                                color === colorBg && "outline outline-2",
                                colorBg ? colorBg : cx(
                                    "bg-center bg-no-repeat",
                                    "bg-[url('../public/assets/cancel.svg')]",
                                    "dark:bg-[url('../public/assets/cancel-dark.svg')]",
                                ),
                            )}
                        />
                    )
                })}
                <button
                    className={cx(
                        "ml-auto",
                        "w-10 h-10",
                        "icon strike",
                        "before:w-2/3 before:h-full before:top-0",
                        "rounded",
                        strike && "outline",
                    )}
                    onClick={function () {
                        setTempData(function (prevState) {
                            return { ...prevState, strike: !prevState.strike }
                        })
                    }}
                />
                <button
                    className={cx(
                        "w-10 h-10",
                        "icon",
                        star ? "star-yellow" : "star-empty",
                        "before:w-2/3 before:h-full before:top-0",
                    )}
                    onClick={function () {
                        setTempData(function (prevState) {
                            return { ...prevState, star: !prevState.star }
                        })
                    }}
                />
            </div>
            <form
                onSubmit={onSubmit}
                className={cx(
                    "grid grid-cols-2",
                    "md:flex md:justify-end md:flex-row",
                    "p-5 gap-3",
                    commonClassName,
                    bgClassName,
                    "rounded-b mb-2",
                )}
            >
                <input type="text" className="input col-span-2" placeholder="название"
                    autoFocus
                    required
                    defaultValue={title}
                    onChange={function (e) {
                        setTempData(function (prevState) {
                            return { ...prevState, title: e.target.value }
                        })
                    }}
                />
                <input type="number" className="input col-span-2" placeholder="сумма"
                    min={0.00}
                    step={0.01}
                    max={100000.00}
                    defaultValue={sum}
                    onChange={function (e) {
                        setTempData(function (prevState) {
                            return { ...prevState, sum: Number(e.target.value) }
                        })
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
