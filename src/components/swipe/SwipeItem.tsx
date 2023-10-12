import { LeadingActions, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list"
import { DeleteButton } from "../buttons/DeleteButton"
import { Row } from "../Row"
import cx from "../../helpers/cx"
import { EditButton } from "../buttons/EditButton"
import { useItems } from "../ItemsProvider"
import { Item as ItemType } from "../dnd/Dnd"
import { useCallback } from "react"
import { useToggles } from "../TogglesProvider"
import { Form } from "../Form"

interface ItemProps {
    itemId: string
    title: string
    sum: number
    color: string | null
}

export function SwipeItem({ itemId, title, sum, color, ...props }: ItemProps) {
    const [editId, setEdit] = useToggles("edit")
    const [, save] = useItems()

    return (
        <>
            <SwipeableListItem
                {...props}
                maxSwipe={10}
                leadingActions={
                    <LeadingActions>
                        <SwipeAction
                            onClick={useCallback(function () {
                                console.info('swipe action triggered')
                            }, [])}
                        >
                            Action
                        </SwipeAction>
                    </LeadingActions>
                }
                trailingActions={
                    <TrailingActions>
                        <EditButton id={itemId} title="Редак." />
                        <DeleteButton id={itemId} title="Удалить" />
                    </TrailingActions>
                }
            >
                <Row title={title} sum={sum} color={color}
                    className={cx("select-none",
                        editId === itemId && "bg-[var(--form-background)] mt-2 rounded-t border-t-0",
                    )}
                />
            </SwipeableListItem>
            {editId === itemId && (
                <Form
                    defaultValues={{ title, sum, color }}
                    setData={function (newData) {
                        save(function (prevState) {
                            const copy: ItemType[] = JSON.parse(JSON.stringify(prevState))
                            const index = copy.findIndex(function ({ id }) {
                                return id === itemId
                            })
                            copy[index] = {
                                ...copy[index],
                                title: newData.title,
                                sum: newData.sum,
                                color: newData.color,
                            }
                            localStorage.setItem("data", JSON.stringify(copy))
                            return copy
                        })
                        setEdit(null)
                    }}
                    onCancel={function () {
                        setEdit(null)
                    }}
                />
            )}
        </>
    )
}
