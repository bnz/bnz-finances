import { Form } from "../Form"
import { Item as ItemType } from "../dnd/Dnd"
import { saveItems, useItem, useItems } from "../ItemsProvider"
import { useToggles } from "../TogglesProvider"
import { useCallback } from "react"
import { DataItem } from "../../helpers/fetch"

interface EditFormProps {
    id: string
}

export function EditForm({ id: itemId }: EditFormProps) {
    const { title, sum, color, strike, star } = useItem(itemId)
    const [, setEdit] = useToggles("edit")
    const [, save] = useItems()
    const setData = useCallback(function (newData: DataItem) {
        // save(function (prevState) {
        //     const copy: ItemType[] = JSON.parse(JSON.stringify(prevState))
        //     const index = copy.findIndex(function ({ id }) {
        //         return id === itemId
        //     })
        //     copy[index] = {
        //         ...copy[index],
        //         title: newData.title,
        //         sum: newData.sum,
        //         color: newData.color,
        //         strike: newData.strike,
        //         star: newData.star,
        //     }
        //     saveItems(copy)
        //     return copy
        // })
        // @ts-ignore
        setEdit(null)
    }, [save, itemId, setEdit])

    return (
        <Form
            defaultValues={{ title, sum, color, strike, star }}
            setData={setData}
            onCancel={function () {
                // @ts-ignore
                setEdit(null)
            }}
        />
    )
}
