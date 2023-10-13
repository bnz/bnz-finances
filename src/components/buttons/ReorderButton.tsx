import { useToggles, useToggleValues } from "../TogglesProvider"
import { useItems } from "../ItemsProvider"
import cx from "../../helpers/cx"

export function ReorderButton() {
    const [items] = useItems()
    const [reorder, , toggle] = useToggles("reorder")
    const { sortByColors, sortBySum, addNew, edit, sortByFavourites, sortByStrike } = useToggleValues()

    return (
        <button
            disabled={items.length <= 1 || !!sortByColors || !!sortBySum || !!addNew || !!edit || !!sortByFavourites || !!sortByStrike}
            className={cx("icon", reorder ? "confirm" : "reorder")}
            onClick={toggle}
        >
            {reorder ? "Готово" : "Редак."}
        </button>
    )
}
