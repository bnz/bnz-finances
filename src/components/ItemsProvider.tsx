import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react"
import { Item as ItemType, Item, TypeOfItem } from "./dnd/Dnd"
import { noop, useToggleValues } from "./TogglesProvider"
import { groupBy } from "../helpers/groupBy"

export const ItemsContext = createContext<[
    Item[],
    Dispatch<SetStateAction<Item[]>>
]>([[], noop])

export function ItemsProvider({ children }: PropsWithChildren) {
    useEffect(function () {
        console.log("!!! ItemsProvider !!!")
    }, [])

    return (
        <ItemsContext.Provider value={useState<Item[]>(
            JSON.parse(`${localStorage.getItem("data")}`) || [],
        )}>
            {children}
        </ItemsContext.Provider>
    )
}

export function useItems(flag?: "all"): [Item[], Dispatch<SetStateAction<Item[]>>] {
    const [items, setItems] = useContext(ItemsContext)
    const { type, sortByColors, sortBySum, sortByFavourites, sortByStrike } = useToggleValues()
    const typeOfItem = type as never as TypeOfItem

    let resultItems = flag === "all" ? items
        : items.filter(function ({ type }) {
            return type === typeOfItem
        })

    if (sortByColors) {
        resultItems = Array.from(groupBy(resultItems, function (item) {
            return item.color
        })).map(function ([, item]) {
            return item
        }).flat()
    }

    if (sortBySum) {
        resultItems = Array.from(resultItems).sort(function (a, b) {
            return b.sum - a.sum
        })
    }

    if (sortByFavourites) {
        resultItems = resultItems.filter(function (item) {
            return item.star
        })
    }

    if (sortByStrike) {
        resultItems = resultItems.filter(function (item) {
            return !item.strike
        })
    }

    return [resultItems, setItems]
}

export function useItem(id: string): Item {
    return useContext(ItemsContext)[0].find(function ({ id: itemId }) {
        return id === itemId
    }) as Item
}

export function saveItems(items: ItemType[]) {
    localStorage.setItem("data", JSON.stringify(items))
}
