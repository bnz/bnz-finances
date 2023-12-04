import type { Dispatch, PropsWithChildren, SetStateAction } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { Item, TypeOfItem } from "./dnd/Dnd"
import { noop, useToggle, useToggleValues } from "./TogglesProvider"
import { groupBy } from "../helpers/groupBy"

type DataType = Record<string, Item[]>

export const ItemsContext = createContext<[
    DataType,
    Dispatch<SetStateAction<DataType>>
]>([{}, noop])

export function ItemsProvider({ children }: PropsWithChildren) {
    return (
        <ItemsContext.Provider
            value={useState<DataType>(
                JSON.parse(`${localStorage.getItem("data")}`) || [],
            )}
        >
            {children}
        </ItemsContext.Provider>
    )
}

export function useItems(flag?: "all"): [Item[], (newItems: (v: DataType) => DataType) => void] {
    const [data, setItems] = useContext(ItemsContext)
    const activeMonth = useToggle("activeMonth") as string

    const items = data[activeMonth] || []

    const { type, sortByColors, sortBySum, sortByFavourites, sortByStrike } = useToggleValues()
    const typeOfItem = type as never as TypeOfItem

    // let resultItems = flag === "all" ? items
    //     : items.filter(function ({ type }) {
    //         return type === typeOfItem
    //     })

    // if (sortByColors) {
    //     resultItems = Array.from(groupBy(resultItems, function (item) {
    //         return item.color
    //     })).map(function ([, item]) {
    //         return item
    //     }).flat()
    // }

    // if (sortBySum) {
    //     resultItems = Array.from(resultItems).sort(function (a, b) {
    //         return b.sum - a.sum
    //     })
    // }

    // if (sortByFavourites) {
    //     resultItems = resultItems.filter(function (item) {
    //         return item.star
    //     })
    // }

    // if (sortByStrike) {
    //     resultItems = resultItems.filter(function (item) {
    //         return !item.strike
    //     })
    // }

    return [
        items,
        function (newItems) {
            setItems(saveItems(newItems(data)))
        },
    ]
}

export function useMonths() {
    return Object.keys(useContext(ItemsContext)[0]).map(function (title) {
        return { title }
    })
}

export function useItem(id: string): Item {
    return useContext(ItemsContext)[0][""].find(function ({ id: itemId }) {
        return id === itemId
    }) as Item
}

export function saveItems(items: DataType) {
    localStorage.setItem("data", JSON.stringify(items))
    return items
}
