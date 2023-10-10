import { LeadingActions, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import { DeleteButton } from "./DeleteButton"
import { Row } from "../Row"
import cx from "../../helpers/cx"
import { EditButton } from "./EditButton"

interface ItemProps {
    id: string
    title: string
    sum: number
}

interface DragItem {
    index: number
    id: string
    type: string
}

export function Item({ id, title, sum, ...props }: ItemProps) {
    return (
        <SwipeableListItem
            {...props}
            leadingActions={
                <LeadingActions>
                    <SwipeAction
                        onClick={() => console.info('swipe action triggered')}
                    >
                        Action
                    </SwipeAction>
                </LeadingActions>
            }
            trailingActions={
                <TrailingActions>
                    <EditButton
                        title="Редак."
                        onClick={function () {
                            console.info('swipe action triggered')
                        }}
                    />
                    <DeleteButton
                        title="Удалить"
                        onClick={function () {
                            console.info('swipe action triggered')
                        }}
                    />
                </TrailingActions>
            }
            maxSwipe={10}
        >
            <Row title={title} sum={sum}
                className={cx("select-none")}
            />
        </SwipeableListItem>
    )
}
