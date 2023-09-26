import { FormEvent, useCallback, useState } from "react"
import { DataItem } from "./Layout"
import { makeId } from "../helpers/makeId"

interface AddFormProps {
    setData(item: DataItem): void
    onCancel(): void
}

export function AddForm({ setData, onCancel }: AddFormProps) {
    const [title, setTitle] = useState("")
    const [sum, setSum] = useState(0)
    const onSubmit = useCallback(function OnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setData({ id: makeId(), title, sum })
    }, [title, sum, setData])

    return (
        <>
            <form className="p-5 flex gap-3" onSubmit={onSubmit}>
                <input type="text" className="input" placeholder="название"
                    autoFocus
                    required
                    defaultValue={title}
                    onChange={function TitleOnChange(e) {
                        setTitle(e.target.value)
                    }}
                />
                <input type="number" className="input" placeholder="сумма"
                    defaultValue={sum}
                    onChange={function SumOnChange(e) {
                        setSum(Number(e.target.value))
                    }}
                />
                <button type="submit" className="button">
                    Добавить
                </button>
                <button type="button" className="button" onClick={onCancel}>
                    Отмена
                </button>
            </form>
        </>
    )
}
