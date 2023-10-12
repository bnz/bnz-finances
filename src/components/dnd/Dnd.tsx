import update from 'immutability-helper'
import { useCallback, useState } from "react"
import { DndItem } from "./DndItem"
import { useItems } from "../ItemsProvider"
import cx from "../../helpers/cx"

import { commonClassName } from "../Header"

export interface Item {
    id: string
    title: string
    sum: number
    color: string | null
}

export interface ContainerState {
    cards: Item[]
}

interface DndProps {
    items: Item[]
}

export function Dnd() {
    const [items, setItems] = useItems()

    const moveCard = useCallback(function (dragIndex: number, hoverIndex: number) {
        setItems(function UpdateCards(prevCards: Item[]) {
            const res = update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as Item],
                ],
            })

            localStorage.setItem("data", JSON.stringify(res))

            return res
        })
    }, [setItems])

    return (
        <div className={commonClassName}>
            {items.map(function ({ id, title, sum, color }, index) {
                return (
                    <DndItem
                        key={id}
                        index={index}
                        id={id}
                        title={title}
                        sum={sum}
                        moveCard={moveCard}
                        color={color}
                    />
                )
            })}
        </div>
    )
}
