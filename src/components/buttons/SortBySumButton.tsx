import cx from "../../helpers/cx"
import { useToggles } from "../TogglesProvider"
import { selected } from "./SortByColorsButton"

export function SortBySumButton() {
    const [value, , toggle] = useToggles("sortBySum")

    return (
        <button
            className={cx("rounded icon sort1", !!value && selected)}
            onClick={toggle}
        >
            Сум.
        </button>
    )
}
