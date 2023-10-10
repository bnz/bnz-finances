import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from "react"

interface TogglesInterface {
    edit: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
    addNew: [boolean, Dispatch<SetStateAction<boolean>>, VoidFunction]
}

const defaultValue: TogglesInterface = {
    edit: [
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
}

export const TogglesContext = createContext<TogglesInterface>(defaultValue)

export function TogglesProvider({ children }: PropsWithChildren) {
    const [edit, setEdit] = useState(defaultValue.edit[0])
    const [addNew, setAddNew] = useState(defaultValue.addNew[0])

    return (
        <TogglesContext.Provider value={{
            edit: [edit, setEdit, useCallback(function () {
                setEdit(function (prevState) {
                    return !prevState
                })
            }, [setEdit])],
            addNew: [addNew, setAddNew, useCallback(function () {
                setAddNew(function (prevState) {
                    return !prevState
                })
            }, [setAddNew])],
        }}>
            {children}
        </TogglesContext.Provider>
    )
}

export function useToggles(trigger: keyof TogglesInterface) {
    return useContext(TogglesContext)[trigger]
}
