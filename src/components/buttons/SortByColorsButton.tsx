import cx from "../../helpers/cx"
import { useToggles } from "../TogglesProvider"

export const selected = "shadow-inner bg-[--background-color-alt]"

export function SortByColorsButton() {
    const [sortByColors, , toggleSortByColors] = useToggles("sortByColors")

    return (
        <button
            className={cx("rounded icon sort2", !!sortByColors && selected)}
            onClick={toggleSortByColors}
        >
            Цвета
        </button>
    )
}
