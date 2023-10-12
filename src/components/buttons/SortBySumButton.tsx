import cx from "../../helpers/cx"
import { useToggles } from "../TogglesProvider"

export function SortBySumButton() {
    const [sortBySum, , toggleSortBySum] = useToggles("sortBySum")

    return (
        <button
            className={cx("rounded icon sort1", !!sortBySum && "shadow-inner bg-[var(--background-color-alt)]")}
            onClick={toggleSortBySum}
        >
            По сумме
        </button>
    )
}
