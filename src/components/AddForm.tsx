import { Form } from "./Form"
import { saveItems, useItems } from "./ItemsProvider"
import { useToggle, useToggles } from "./TogglesProvider"
import { TypeOfItem } from "./dnd/Dnd"

export function AddForm() {
    const [items, setItems] = useItems()
    const [addNew, setAddNew, toggle] = useToggles("addNew")
    const type = useToggle("type")

    return (
        <>
            {(addNew || items.length <= 0) && (
                <Form
                    setData={function (item) {
                        setItems(function (prevState) {
                            item.type = type as TypeOfItem
                            const res = [...prevState, item]
                            saveItems(res)
                            return res
                        })
                        items.length <= 0 ? toggle() : setAddNew(false as any)
                    }}
                    {...items.length <= 0 ? {} : {
                        onCancel: toggle,
                    }}
                />
            )}
        </>
    )
}
