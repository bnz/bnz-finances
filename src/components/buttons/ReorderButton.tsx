import { useToggle, useToggles, useToggleValues } from "../TogglesProvider"
import { useItems } from "../ItemsProvider"
import cx from "../../helpers/cx"

export function ReorderButton() {
    const [items] = useItems()
    const [editMode, , toggle] = useToggles("reorder")
    const { sortByColors, sortBySum } = useToggleValues()

    return (
        <button
            disabled={items.length <= 1 || !!sortByColors || !!sortBySum}
            className={cx("icon", editMode ? "confirm" : "reorder")}
            onClick={toggle}
        >
            {editMode ? "Готово" : "Редак."}
        </button>
    )
}
