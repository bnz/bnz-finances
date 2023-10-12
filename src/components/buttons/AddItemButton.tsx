import { useToggles } from "../TogglesProvider"
import cx from "../../helpers/cx"
import { useItems } from "../ItemsProvider"

export function AddItemButton() {
    const [items] = useItems()
    const [addNew, , toggle] = useToggles("addNew")

    return (
        <button
            disabled={items.length <= 0}
            className={cx("icon", addNew ? "cancel" : "add")}
            onClick={toggle}
        >
            {addNew ? "Отмена" : "Добавить"}
        </button>
    )
}
