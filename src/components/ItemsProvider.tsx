import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react"
import { Item } from "./dnd/Dnd"

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
    return useContext(ItemsContext)
}

