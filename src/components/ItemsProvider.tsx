import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react"
import { Item } from "./dnd/Dnd"
import { useToggles } from "./TogglesProvider"
import { groupBy } from "../helpers/groupBy"

export const ItemsContext = createContext<[
    Item[],
    Dispatch<SetStateAction<Item[]>>
]>([[], function () {
}])

export function ItemsProvider({ children }: PropsWithChildren) {
    useEffect(() => {
        console.log("!!! ItemsProvider !!!")
    }, [])

    return (
        <ItemsContext.Provider value={useState<Item[]>(
            JSON.parse(`${localStorage.getItem("data")}`) || [
                {
                    id: "1",
                    title: "Write a cool JS library",
                    sum: 100,
                },
                {
                    id: "2",
                    title: "asd",
                    sum: 125,
                },
            ],
        )
        }>
            {children}
        </ItemsContext.Provider>
    )
}

export function useItems(): [Item[], Dispatch<SetStateAction<Item[]>>] {
    const [items, setItems] = useContext(ItemsContext)
    const [sortByColors] = useToggles("sortByColors")
    const [sortBySum] = useToggles("sortBySum")

    if (sortByColors) {
        return [
            Array.from(groupBy(items, (item) => item.color)).map(function ([, item]) {
                return item
            }).flat(),
            setItems,
        ]
    }

    if (sortBySum) {
        return [
            Array.from(items).sort(function (a, b) {
                return b.sum - a.sum
            }),
            setItems,
        ]
    }

    return [items, setItems]
}

