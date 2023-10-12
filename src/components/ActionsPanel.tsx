import cx from "../helpers/cx"
import { ReorderButton } from "./buttons/ReorderButton"
import { AddItemButton } from "./buttons/AddItemButton"
import { commonClassName } from "./Header"
import { SortByColorsButton } from "./buttons/SortByColorsButton"
import { SortBySumButton } from "./buttons/SortBySumButton"

export function ActionsPanel() {
    return (
        <div className={cx("h-14 my-3 flex", commonClassName)}>
            <AddItemButton />
            <ReorderButton />
            <div className="flex-1" />
            <SortByColorsButton />
            <SortBySumButton />
        </div>
    )
}
