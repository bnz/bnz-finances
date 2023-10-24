import { Form } from "./Form"
import { saveItems, useItems } from "./ItemsProvider"
import { useToggles, useToggleValues } from "./TogglesProvider"
import { TypeOfItem } from "./dnd/Dnd"

export function AddForm() {
    const [items, setItems] = useItems()
    const [addNew, setAddNew, toggle] = useToggles("addNew")
    const { type, sortByFavourites, sortByStrike } = useToggleValues()

    return (
        <>
            {(addNew || items.length <= 0) && !sortByFavourites && !sortByStrike && (
                <Form
                    setData={function (item) {
                        setItems(function (prevState) {
                            item.type = type as never as TypeOfItem
                            const res = [...prevState, item]
                            saveItems(res)
                            setAddNew(false as any)
                            return res
                        })
                    }}
                    {...items.length <= 0 ? {} : {
                        onCancel: toggle,
                    }}
                />
            )}
        </>
    )
}
