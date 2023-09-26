import cx from "../helpers/cx"
import { FormEvent, useCallback, useEffect, useState } from "react"
import { AddForm } from "./AddForm"
import { Header } from "./Header"
import { fetch } from "../helpers/fetch"
import { Simulate } from "react-dom/test-utils"

export interface DataItem {
    id: string
    title: string
    sum: number
}

export type Data = DataItem[]

export const moneySymbol = "€"

export function Layout() {
    const [addFormVisible, setAddFormVisible] = useState(false)
    const [data, setData] = useState<Data>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        try {
            ;(async () => {
                const data = await fetch()
                setData(data)
                setLoading(false)
            })()
        } catch (e) {
            console.log("CATCH", e)
        }
    }, [setData, setLoading])

    const addItem = useCallback(async function AddItem(item: DataItem) {
        setLoading(true)
        const copy: Data = JSON.parse(JSON.stringify(data))
        copy.push(item)
        const response = await fetch<{ record: Data }>("PUT", JSON.stringify(copy))
        setData(response.record)
        setLoading(false)
        setAddFormVisible(false)
    }, [data, setData, setLoading, setAddFormVisible])

    return (
        <>
            <Header />

            {loading && (
                <div className="py-20 text-center">
                    загрузка...
                </div>
            )}

            {!loading && data.length > 0 && (
                <ul className="p-2 m-2">
                    {data.map(function DataMap({ id, title, sum }) {
                        return (
                            <li key={id} className={cx(
                                "p-2 border-t border-[var(--line-color)] [&:first-child]:border-0",
                                "grid grid-cols-[1fr_150px_40px]",
                            )}>
                                <div>{title}</div>
                                <div className="text-right outline">
                                    {sum.toFixed(2)}{moneySymbol}
                                </div>
                                <div className="text-right">
                                    <button onClick={function DeleteItem() {

                                    }}>
                                        X
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}

            {!addFormVisible && !loading && data.length > 0 && (
                <div className="p-2">
                    <button type="button" className="button" onClick={function ShowAddForm() {
                        setAddFormVisible(true)
                    }}>
                        Добавить
                    </button>
                </div>
            )}

            {(addFormVisible || data.length === 0) && !loading && (
                <AddForm setData={addItem} onCancel={function OnCancel() {
                    setAddFormVisible(false)
                }} />
            )}

            {!loading && (
                <footer className="h-20 sticky bottom-0 bg-[var(--background-color)] p-3">
                    <strong>
                        Всего: {data.reduce(function (prev, { sum }) {
                        return prev + sum
                    }, 0)}{moneySymbol}
                    </strong>
                </footer>
            )}
        </>
    )
}
