import update from 'immutability-helper'
import { useCallback, useState } from "react"
import { Card } from "./Card"

export interface Item {
    id: number
    text: string
}

export interface ContainerState {
    cards: Item[]
}

export function Dnd() {
    const [cards, setCards] = useState([
        {
            id: 1,
            text: 'Write a cool JS library',
        },
        {
            id: 2,
            text: 'Make it generic enough',
        },
        {
            id: 3,
            text: 'Write README',
        },
        {
            id: 4,
            text: 'Create some examples',
        },
        {
            id: 5,
            text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
            id: 6,
            text: '???',
        },
        {
            id: 7,
            text: 'PROFIT',
        },
    ])

    const moveCard = useCallback(function (dragIndex: number, hoverIndex: number) {
        setCards(function UpdateCards(prevCards: Item[]) {
            return update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as Item],
                ],
            })
        })
    }, [])

    return (
        <div style={{ width: 400 }}>
            {cards.map(function ({ id, text }, index) {
                return (
                    <Card
                        key={id}
                        index={index}
                        id={id}
                        text={text}
                        moveCard={moveCard}
                    />
                )
            })}
        </div>
    )
}
