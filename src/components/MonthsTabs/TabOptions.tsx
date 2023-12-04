import { useCallback, useState } from "react"
import cx from "../../helpers/cx"
import { KeyboardActions } from "../../helpers/KeyboardActions"
import { DeleteButton } from "./DeleteButton"

export function TabOptions() {
    const [open, setOpen] = useState(false)
    const toggle = useCallback(function () {
        setOpen(function (prevState) {
            return !prevState
        })
    }, [setOpen])

    return (
        <>
            <button
                className={cx(
                    "absolute top-1/2 -translate-y-1/2 right-0",
                    "h-2/3 w-8",
                    "icon dots before:top-1/2 before:-translate-y-1/2 pb-0 before:w-full before:h-full",
                    "opacity-0 group-hover/button:animate-fade-in",
                    open && "opacity-100",
                )}
                onClick={toggle}
            />
            {open && (
                <>
                    <KeyboardActions actions={{ Escape: toggle }} />
                    <div className="fixed inset-0 cursor-auto" onClick={toggle} />
                    <div
                        className="absolute rounded top-[100%] right-0 bg-main p-3 shadow-lg cursor-auto flex flex-col gap-3"
                    >
                        <button
                            type="button"
                            className={cx(
                                "py-2 pl-8 pr-2 hover:bg-main-alt rounded text-left",
                                "bg-no-repeat bg-[4px_center] bg-[length:24px_24px]",
                                "dark:bg-[url('../public/assets/edit-dark.svg')]",
                                "bg-[url('../public/assets/edit.svg')]",
                            )}
                            onClick={function () {
                                toggle()
                                console.log("edit")
                            }}
                        >
                            Редактировать
                        </button>
                        <DeleteButton close={toggle} />
                    </div>
                </>
            )}
        </>
    )
}
