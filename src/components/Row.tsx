import type { DragEvent } from "react"
import cx from "../helpers/cx"
import { sumDecorator } from "../helpers/sumDecorator"
import { useRef, useState } from "react"

interface RowProps {
    id: string
    title: string
    sum: number
}

export const gridRowClassNames: string = "grid grid-cols-[1fr_150px_50px] gap-2"

let hoveredId: string | null = null

export function Row({ id, title, sum }: RowProps) {
    const ref = useRef<null | HTMLLIElement>(null)
    const [dragging, setDragging] = useState(false)

    function onDrop() {
        setDragging(false)
    }

    function onDragEnd() {
        setDragging(true)
    }

    function onDragEnter(e: DragEvent<HTMLLIElement>) {
        e.preventDefault()
        e.stopPropagation()
    }

    function onDragOver(e: DragEvent<HTMLLIElement>) {
        onDragEnter(e)
        if (hoveredId !== id) {
            setDragging(true)
        }
    }

    function onDragStart(e: DragEvent<HTMLLIElement>) {
        hoveredId = id
        onDragEnd()
        e.dataTransfer.setData("text/plain", title)
    }

    return (
        <>
            <li
                ref={ref}
                draggable
                onDrop={onDrop}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}
                onDragExit={onDrop}
                onDragLeave={onDrop}
                onDragOver={onDragOver}
                className={cx(
                    gridRowClassNames,
                    "relative",
                    "px-2 border-t border-[var(--line-color)] [&:first-child]:border-0",
                    "hover:bg-[var(--background-color-alt)]",
                    "h-12",
                )}
            >
                <div className="text-xl flex items-center">
                    {title}
                </div>
                <code className="text-xl flex items-center justify-end">
                    {sumDecorator(sum)}
                </code>
                <div className="flex [&>*]:w-1/2">
                    <button title="Редактор" onClick={function EditItem() {
                    }}>
                        Р
                    </button>
                    <button onClick={function DeleteItem() {
                    }}>
                        X
                    </button>
                </div>
                {(dragging && hoveredId !== id) && (
                    <>
                        <div className="absolute left-0 right-0 top-0 h-1/2 bg-red-500/30"
                            onDrop={function () {
                                console.log("BEFORE")
                            }} />
                        <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-red-500/30"
                            onDrop={function () {
                                console.log("AFTER")
                            }} />
                    </>
                )}
            </li>
        </>
    )
}
