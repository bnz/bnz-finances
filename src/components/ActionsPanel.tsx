import cx from "../helpers/cx"
import { ReorderButton } from "./buttons/ReorderButton"
import { AddItemButton } from "./buttons/AddItemButton"
import { commonClassName } from "./Header"
import { SortByColorsButton } from "./buttons/SortByColorsButton"
import { SortBySumButton } from "./buttons/SortBySumButton"
import { SortByFavouritesButton } from "./buttons/SortByFavouritesButton"
import { SortByStrikeButton } from "./buttons/SortByStrikeButton"
import { useToggle } from "./TogglesProvider"

export function ActionsPanelRenderer() {
    const menu = useToggle("menu")

    return (
        <div className={cx(
            "overflow-hidden transition-[height] flex",
            commonClassName,
            "sticky top-14 bg-[--background-color] shadow z-20",
            menu ? "h-20 py-3" : "h-0",
        )}>
            {menu && (
                <ActionsPanel />
            )}
        </div>
    )
}

function ActionsPanel() {
    return (
        <>
            <AddItemButton />
            <ReorderButton />
            <SortByStrikeButton />
            <SortByFavouritesButton />
            <SortByColorsButton />
            <SortBySumButton />
        </>
    )
}
