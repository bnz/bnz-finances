import cx from "../../helpers/cx"
import { useToggles } from "../TogglesProvider"

export function SortByColorsButton() {
    const [sortByColors, , toggleSortByColors] = useToggles("sortByColors")

    return (
        <button
            className={cx("rounded icon sort2", !!sortByColors && "shadow-inner bg-[var(--background-color-alt)]")}
            onClick={toggleSortByColors}
        >
            По цветам
        </button>
    )
}
