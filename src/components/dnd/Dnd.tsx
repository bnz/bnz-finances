import update from 'immutability-helper'
import { useCallback } from "react"
import { DndItem } from "./DndItem"
import { saveItems, useItems } from "../ItemsProvider"

import { commonClassName } from "../Header"

export enum TypeOfItem {
    income,
    outcome,
}

export interface Item {
    id: string
    type?: TypeOfItem
    title: string
    sum: number
    color: string | null
    star?: boolean
    strike?: boolean
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
            saveItems(res)
            return res
        })
    }, [setItems])

    return (
        <div className={commonClassName}>
            {items.map(function ({ id, title, sum, color }, index) {
                return (
                    <DndItem key={id} index={index} id={id} moveCard={moveCard} />
                )
            })}
        </div>
    )
}
