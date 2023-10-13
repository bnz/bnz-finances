import cx from "../../helpers/cx"
import { selected } from "./SortByColorsButton"
import { useToggles } from "../TogglesProvider"

export function SortByStrikeButton() {
    const [value, , toggle] = useToggles("sortByStrike")

    return (
        <button
            className={cx("rounded icon strike ml-auto", !!value && selected)}
            onClick={toggle}
        >
            Зачерк.
        </button>
    )
}
