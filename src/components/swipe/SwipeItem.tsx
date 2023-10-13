import { LeadingActions, SwipeableListItem, TrailingActions } from "react-swipeable-list"
import { DeleteButton } from "../buttons/DeleteButton"
import { Row } from "../Row"
import cx from "../../helpers/cx"
import { EditButton } from "../buttons/EditButton"
import { useToggleValues } from "../TogglesProvider"
import { FavouriteButton } from "../buttons/FavouriteButton"
import { StrikeButton } from "../buttons/StrikeButton"
import { EditForm } from "./EditForm"
import { TypeOfItem } from "../dnd/Dnd"

interface ItemProps {
    itemId: string
}

export function SwipeItem({ itemId, ...props }: ItemProps) {
    const { edit: editId, type } = useToggleValues()

    return (
        <>
            <SwipeableListItem
                {...props}
                maxSwipe={10}
                leadingActions={
                    <LeadingActions>
                        <FavouriteButton id={itemId} />
                        <StrikeButton id={itemId} />
                    </LeadingActions>
                }
                trailingActions={
                    <TrailingActions>
                        <EditButton id={itemId} />
                        <DeleteButton id={itemId} />
                    </TrailingActions>
                }
            >
                <Row
                    id={itemId}
                    className={cx("select-none",
                        editId === itemId && cx(
                            "bg-[var(--form-background)] mt-2 rounded-t border-t-0",
                            (type as never as TypeOfItem) === TypeOfItem.income
                                ? "bg-[var(--form-background-income)]"
                                : "bg-[var(--form-background-outcome)]",
                        ),
                    )}
                />
            </SwipeableListItem>
            {editId === itemId && (
                <EditForm id={itemId} />
            )}
        </>
    )
}
