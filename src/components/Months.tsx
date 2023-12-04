import { commonClassName } from "./Header"
import cx from "../helpers/cx"
import { FormEvent, useCallback, useState } from "react"
import { KeyboardActions } from "../helpers/KeyboardActions"
import { TogglesInterface, useToggle, useToggles } from "./TogglesProvider"
import { MonthsTabs } from "./MonthsTabs/MonthsTabs"
import { useItems, useMonths } from "./ItemsProvider"

const monthsList: Record<"title", string>[] = [
    { title: "Январь" },
    { title: "Февраль" },
    { title: "Март" },
    { title: "Апрель" },
    { title: "Май" },
    { title: "Июнь" },
    { title: "Июль" },
    { title: "Август" },
    { title: "Сентябрь" },
    { title: "Октябрь" },
    { title: "Ноябрь" },
    { title: "Декабрь" },
]

const yearsList: Record<"title", string>[] = [
    { title: "2023" },
    { title: "2024" },
    { title: "2025" },
    { title: "2026" },
    { title: "2027" },
]

export function Months() {
    const months = useMonths()

    const [open, setOpen] = useState(false)

    const close = useCallback(function () {
        setOpen(false)
    }, [setOpen])

    const [month, setMonth] = useState<string>("")
    const [year, setYear] = useState<string>(yearsList[0].title)

    const [, setActiveMonth] = useToggles("activeMonth") as TogglesInterface["activeMonth"]

    const [, setItems] = useItems()

    const onSubmit = useCallback(function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setItems(function (prevState) {
            return { ...prevState, [`${month}-${year}`]: [] }
        })
        close()
    }, [month, year, setActiveMonth, close, setItems])

    return (
        <div className={cx(commonClassName, "flex flex-row md:gap-3 relative")}>
            {open && (
                <>
                    <KeyboardActions actions={{ Escape: close }} />
                    <div className="fixed inset-0 bg-backdrop z-20" onClick={close} />
                    <form onSubmit={onSubmit} className={cx(
                        "absolute top-5 left-5 right-5 md:right-auto",
                        "rounded bg-main p-5 shadow-lg z-30 md:w-1/3",
                        "grid grid-cols-2 gap-5",
                    )}>
                        <h5 className="font-bold col-span-2 text-center">
                            Добавить месяц
                        </h5>
                        <select defaultValue={month} className="col-span-2" onChange={function (e) {
                            setMonth(e.target.value)
                        }}>
                            <option value="" disabled>- Выбирите месяц -</option>
                            {monthsList.map(function ({ title }) {
                                return (
                                    <option key={title} value={title}>{title}</option>
                                )
                            })}
                        </select>
                        <select defaultValue={year} className="col-span-2" onChange={function (e) {
                            setYear(e.target.value)
                        }}>
                            <option value="" disabled>- Выбирите год -</option>
                            {yearsList.map(function ({ title }) {
                                return (
                                    <option key={title} value={title}>{title}</option>
                                )
                            })}
                        </select>
                        <button className="button" onClick={close}>
                            Отмена
                        </button>
                        <button type="submit" className="button" disabled={month === "" || year === ""}>
                            Добавить
                        </button>
                    </form>
                </>
            )}
            <div className="flex items-center justify-center">
                <button className="icon add before:top-1/2 before:-translate-y-1/2 pb-0"
                    onClick={function () {
                        setOpen(true)
                    }}
                />
            </div>
            <div className="flex-1 flex items-center">
                {months.length ? (
                    <MonthsTabs />
                ) : (
                    <>
                        <div className="icon arrowLeft before:top-1/2 before:-translate-y-1/2 pb-0" />
                        <div>Добавьте месяц</div>
                    </>
                )}
            </div>
            {/*<div className="flex items-center justify-center">*/}
            {/*    <button className="icon history before:top-1/2 before:-translate-y-1/2 pb-0" />*/}
            {/*</div>*/}
        </div>
    )
}
