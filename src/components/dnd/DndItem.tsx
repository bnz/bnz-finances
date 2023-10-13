import type { Identifier, XYCoord } from 'dnd-core'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import cx from "../../helpers/cx"
import { Row } from "../Row"

export const ItemTypes = {
    CARD: 'card',
}

export interface CardProps {
    id: any
    index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

export function DndItem({ id, index, moveCard }: CardProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item() {
            return { id, index }
        },
        collect(monitor: any) {
            return {
                isDragging: monitor.isDragging(),
            }
        },
    })

    drag(drop(ref))

    return (
        <Row
            id={id}
            ref={ref}
            className={cx(
                "select-none cursor-move flex with-drag",
                isDragging ? "opacity-0" : "opacity-100",
            )}
        />
    )
}
