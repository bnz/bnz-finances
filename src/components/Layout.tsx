import cx from "../helpers/cx"
import { FormEvent, useCallback, useEffect, useState } from "react"
import { AddForm } from "./AddForm"
import { Header } from "./Header"
import { fetch } from "../helpers/fetch"
import { Simulate } from "react-dom/test-utils"
import { sumDecorator } from "../helpers/sumDecorator"
import { gridRowClassNames, Row } from "./Row"

export interface DataItem {
    id: string
    title: string
    sum: number
}

export type Data = DataItem[]

export const moneySymbol = "€"

export const commonClassName: string = "mx-auto lg:max-w-4xl"

export function Layout() {
    const [addFormVisible, setAddFormVisible] = useState(false)
    const [data, setData] = useState<Data>(
        [
            {
                "id": "883510ea-6b54-42e9-9ac2-98f2ca5f097c",
                "title": "bonez",
                "sum": 42,
            },
            {
                "id": "7193757c-a413-4e47-ae30-2dc221786e6c",
                "title": "asd",
                "sum": 101,
            },
            {
                "id": "eb189c1b-dc31-4b3c-9596-13e7dd325ccf",
                "title": "asdasdasdasd",
                "sum": 1,
            },
            {
                "id": "0cbf3ac7-49ce-42d2-9db3-0f8ed00e4e39",
                "title": "222",
                "sum": 777,
            },
            {
                "id": "15016a0f-2a18-4da5-a44e-7d92265616f8",
                "title": "asdasdasd",
                "sum": 223,
            },
        ],
    )
    const [loading, setLoading] = useState<boolean>(false)

    // console.log(data)

    // useEffect(() => {
    //     setLoading(true)
    //     try {
    //         ;(async () => {
    //             const data = await fetch()
    //             setData(data)
    //             setLoading(false)
    //         })()
    //     } catch (e) {
    //         console.log("CATCH", e)
    //     }
    // }, [setData, setLoading])

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
                <ul className={cx("p-2 m-2", commonClassName)}>
                    {data.map(function DataMap({ id, title, sum }) {
                        return (
                            <Row key={id} id={id} sum={sum} title={title} />
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
                <footer className={cx(
                    "sticky bottom-0 bg-[var(--background-color)]",
                    "px-4 py-2 border-t border-[var(--line-color)] [&:first-child]:border-0",
                    gridRowClassNames,
                )}>
                    <strong className="text-xl">Всего:</strong>
                    {" "}
                    <code className="text-xl text-right">{sumDecorator(data.reduce(function (prev, { sum }) {
                        return prev + sum
                    }, 0))}</code>
                </footer>
            )}
        </>
    )
}
