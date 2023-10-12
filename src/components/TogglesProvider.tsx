import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from "react"
import { stringify } from "querystring"

interface TogglesInterface {
    reorder: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    addNew: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    edit: [string | null, Dispatch<SetStateAction<string | null>>, VoidFunction]
    sortByColors: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    sortBySum: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
}

const defaultValue: TogglesInterface = {
    reorder: [
        false,
        function () {
        },
        function () {
        },
    ],
    addNew: [
        false,
        function () {
        },
        function () {
        },
    ],
    edit: [
        null,
        function () {
        },
        function () {
        },
    ],
    sortByColors: [
        false,
        function () {
        },
        function () {
        },
    ],
    sortBySum: [
        false,
        function () {
        },
        function () {
        },
    ],
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
    })

    const [reorder, setReorder] = useState(defaultValue.reorder[0])
    const [addNew, setAddNew] = useState(defaultValue.addNew[0])
    const [edit, setEdit] = useState(defaultValue.edit[0])
    const [sortByColors, setSortByColors] = useState(saved.sortByColors)
    const [sortBySum, setSortBySum] = useState(saved.sortBySum)

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
            useCallback(function () {
            }, []),
        ],
        sortByColors: [
            sortByColors,
            setSortByColors,
            useCallback(function () {
                setSortByColors(function (prevState) {
                    setSortBySum(false)
                    saveToggles({ sortByColors: !prevState, sortBySum: false })
                    return !prevState
                })
            }, [setSortByColors, setSortBySum]),
        ],
        sortBySum: [
            sortBySum,
            setSortBySum,
            useCallback(function () {
                setSortBySum(function (prevState) {
                    setSortByColors(false)
                    saveToggles({ sortBySum: !prevState, sortByColors: false })
                    return !prevState
                })
            }, [setSortBySum, setSortByColors]),
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
    })
    return res as Record<keyof TogglesInterface, string | null | boolean>
}
