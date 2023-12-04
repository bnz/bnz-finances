import type { Dispatch, PropsWithChildren, SetStateAction } from "react"
import { createContext, useCallback, useContext, useState } from "react"
import { TypeOfItem } from "./dnd/Dnd"

export interface TogglesInterface {
    reorder: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    addNew: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    edit: [string | null, Dispatch<SetStateAction<string | null>>, VoidFunction]
    sortByColors: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    sortBySum: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    sortByFavourites: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    sortByStrike: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    menu: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    type: [TypeOfItem, Dispatch<SetStateAction<TypeOfItem>>, VoidFunction]
    activeMonth: [string, (value: string) => void]
}

export function noop() {
}

const defaultValue: TogglesInterface = {
    reorder: [false, noop, noop],
    addNew: [false, noop, noop],
    edit: [null, noop, noop],
    sortByColors: [false, noop, noop],
    sortBySum: [false, noop, noop],
    sortByFavourites: [false, noop, noop],
    sortByStrike: [false, noop, noop],
    menu: [false, noop, noop],
    type: [TypeOfItem.outcome, noop, noop],
    activeMonth: ["", noop],
}

export const TogglesContext = createContext<TogglesInterface>(defaultValue)

function getToggles(defaultValue: object = {}) {
    return JSON.parse(localStorage.getItem("toggles") || JSON.stringify(defaultValue))
}

export function saveToggles(value: Partial<Record<keyof TogglesInterface, any>>) {
    localStorage.setItem("toggles", JSON.stringify({ ...getToggles(), ...value }))
}

export function TogglesProvider({ children }: PropsWithChildren) {
    const saved: Record<keyof TogglesInterface, boolean> = getToggles({
        sortByColors: defaultValue.sortByColors[0],
        sortBySum: defaultValue.sortBySum[0],
        sortByFavourites: defaultValue.sortByFavourites[0],
        sortByStrike: defaultValue.sortByStrike[0],
        menu: defaultValue.menu[0],
        type: defaultValue.type[0],
    })

    const [reorder, setReorder] = useState(defaultValue.reorder[0])
    const [addNew, setAddNew] = useState(defaultValue.addNew[0])
    const [edit, setEdit] = useState(defaultValue.edit[0])
    const [sortByColors, setSortByColors] = useState(saved.sortByColors)
    const [sortBySum, setSortBySum] = useState(saved.sortBySum)
    const [sortByFavourites, setSortByFavourites] = useState(saved.sortByFavourites)
    const [sortByStrike, setSortByStrike] = useState(saved.sortByStrike)
    const [menu, setMenu] = useState(saved.menu)
    const [type, setType] = useState(saved.type as never as TypeOfItem)
    const [activeMonth, setActiveMonth] = useState(saved.activeMonth as never as string)

    const value: TogglesInterface = {
        reorder: [reorder, setReorder, useCallback(function () {
            setReorder(function (prevState) {
                return !prevState
            })
        }, [setReorder])],
        addNew: [addNew, setAddNew, useCallback(function () {
            setAddNew(function (prevState) {
                return !prevState
            })
        }, [setAddNew])],
        edit: [
            edit,
            setEdit,
            useCallback(noop, []),
        ],
        sortByColors: [
            sortByColors,
            setSortByColors,
            useCallback(function () {
                setSortByColors(function (prevState) {
                    setSortBySum(false)
                    setSortByFavourites(false)
                    setSortByStrike(false)
                    saveToggles({
                        sortByColors: !prevState,
                        sortBySum: false,
                        sortByFavourites: false,
                        sortByStrike: false,
                    })
                    return !prevState
                })
            }, [setSortByColors, setSortBySum, setSortByFavourites, setSortByStrike]),
        ],
        sortBySum: [
            sortBySum,
            setSortBySum,
            useCallback(function () {
                setSortBySum(function (prevState) {
                    setSortByColors(false)
                    setSortByFavourites(false)
                    setSortByStrike(false)
                    saveToggles({
                        sortBySum: !prevState,
                        sortByColors: false,
                        sortByFavourites: false,
                        sortByStrike: false,
                    })
                    return !prevState
                })
            }, [setSortByColors, setSortBySum, setSortByFavourites, setSortByStrike]),
        ],
        sortByFavourites: [
            sortByFavourites,
            setSortByFavourites,
            useCallback(function () {
                setSortByFavourites(function (prevState) {
                    setSortByColors(false)
                    setSortBySum(false)
                    setSortByStrike(false)
                    saveToggles({
                        sortByFavourites: !prevState,
                        sortBySum: false,
                        sortByColors: false,
                        sortByStrike: false,
                    })
                    return !prevState
                })
            }, [setSortByColors, setSortBySum, setSortByFavourites, setSortByStrike]),
        ],
        sortByStrike: [
            sortByStrike,
            setSortByStrike,
            useCallback(function () {
                setSortByStrike(function (prevState) {
                    setSortByColors(false)
                    setSortBySum(false)
                    setSortByFavourites(false)
                    saveToggles({
                        sortByStrike: !prevState,
                        sortByFavourites: false,
                        sortBySum: false,
                        sortByColors: false,
                    })
                    return !prevState
                })
            }, [setSortByColors, setSortBySum, setSortByFavourites, setSortByStrike]),
        ],
        menu: [
            menu,
            setMenu,
            useCallback(function () {
                setMenu(function (prevState) {
                    saveToggles({ menu: !prevState })
                    return !prevState
                })
            }, [setMenu]),
        ],
        type: [
            type,
            setType,
            useCallback(function () {
                setType(function (prevState) {
                    return prevState === TypeOfItem.outcome ? TypeOfItem.income : TypeOfItem.outcome
                })
            }, [setType]),
        ],
        activeMonth: [
            activeMonth,
            useCallback(function (activeMonth) {
                setActiveMonth(activeMonth)
                saveToggles({ activeMonth })
            }, []),
        ],
    }

    return (
        <TogglesContext.Provider value={value}>
            {children}
        </TogglesContext.Provider>
    )
}

export function useToggles(toggle: keyof TogglesInterface) {
    return useContext(TogglesContext)[toggle]
}

export function useToggle(toggle: keyof TogglesInterface) {
    return useContext(TogglesContext)[toggle][0]
}

export function useToggleValues() {
    const toggles = useContext(TogglesContext)
    const res: any = {}
    Object.keys(toggles).map(function (_key) {
        const key = _key as keyof TogglesInterface
        res[key] = toggles[key][0]
        return key
    })
    return res as Record<keyof TogglesInterface, string | null | boolean>
}
