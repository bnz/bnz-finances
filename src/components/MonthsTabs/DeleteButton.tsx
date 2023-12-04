import { useState } from "react"
import { useToggle } from "../TogglesProvider"
import { useItems } from "../ItemsProvider"
import cx from "../../helpers/cx"
import { createPortal } from "react-dom"

interface DeleteButtonProps {
    close: VoidFunction
}

export function DeleteButton({ close }: DeleteButtonProps) {
    const [open, setOpen] = useState(false)
    const activeMonth = useToggle("activeMonth") as string
    const [, setItems] = useItems()

    return (
        <>
            <button
                type="button"
                className={cx(
                    "py-2 pl-8 pr-2 hover:bg-main-alt rounded text-left",
                    "bg-no-repeat bg-[4px_center] bg-[length:24px_24px]",
                    "bg-[url('../public/assets/cancel-red.svg')]",
                )}
                onClick={function () {
                    setOpen(true)
                }}
            >
                Удалить
            </button>
            {open && (
                createPortal(
                    <>
                        <div className="fixed inset-0 bg-backdrop z-30" />
                        <div className={cx(
                            "absolute left-1 right-1 lg:left-1/2 top-1/2 -translate-y-1/2 lg:-translate-x-1/2 rounded bg-main z-30 shadow-lg p-5",
                            "grid grid-cols-2 gap-5",
                        )}>
                            <h3 className="col-span-2 text-center px-5">
                                Вы уверены, что хотите удалить этот месяц вместе со всеми данными?
                            </h3>
                            <button type="button" className="button" onClick={function () {
                                close()
                                setOpen(false)
                            }}>
                                Отмена
                            </button>
                            <button
                                type="button"
                                className={cx(
                                    "button",
                                    "bg-no-repeat bg-[4px_center] bg-[length:24px_24px]",
                                    "text-[rgb(239,68,68)]",
                                )}
                                onClick={function () {
                                    setItems(function (v) {
                                        const copy = JSON.parse(JSON.stringify(v))
                                        delete copy[activeMonth]
                                        return copy
                                    })
                                }}
                            >
                                Удалить
                            </button>
                        </div>
                    </>,
                    document.body,
                )
            )}
        </>
    )
}
