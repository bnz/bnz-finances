import { Form } from "./Form"
import { useItems } from "./ItemsProvider"
import { useToggles } from "./TogglesProvider"

export function AddForm() {
    const [items, saveItems] = useItems()
    const [addNew, setAddNew, toggle] = useToggles("addNew")

    return (
        <>
            {(addNew || items.length <= 0) && (
                <Form
                    setData={function (item) {
                        saveItems(function (prevState) {
                            const res = [...prevState, item]
                            localStorage.setItem("data", JSON.stringify(res))
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
