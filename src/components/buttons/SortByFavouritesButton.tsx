import cx from "../../helpers/cx"
import { selected } from "./SortByColorsButton"
import { useToggles } from "../TogglesProvider"


export function SortByFavouritesButton() {
    const [value, , toggle] = useToggles("sortByFavourites")

    return (
        <button
            className={cx("rounded icon star", !!value && selected)}
            onClick={toggle}
        >
            Избр.
        </button>
    )
}
