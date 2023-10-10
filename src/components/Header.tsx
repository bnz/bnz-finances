import cx from "../helpers/cx"
import { commonClassName } from "./Layout"
import { useToggles } from "./TogglesProvider"

export function Header() {
    const [editMode, , toggle] = useToggles("edit")
    const [addNew, , toggleAddNew] = useToggles("addNew")

    return (
        <header
            className={cx(
                "z-10 sticky top-0 select-none text-center bg-[var(--background-color)] shadow h-14",
                commonClassName,
            )}
        >
            <h1 className="relative h-14">
                    <span className="text-gradient font-thin text-3xl">
                        Ю. <span className="text-xl ">и</span> Ю.
                    </span>
                <span className={cx(
                    "text-gradient",
                    "font-thin text-xs",
                    "absolute bottom-1 left-1/2 -translate-x-1/2",
                )}>
                    финансы
                </span>
            </h1>
            <button className="absolute right-0 top-0 bottom-0 px-2" onClick={toggle}>
                {editMode ? "Готово" : "Редак."}
            </button>
            <button className="absolute left-0 top-0 bottom-0 px-2" onClick={toggleAddNew}>
                {addNew ? "Отмена" :"Добавить"}
            </button>
        </header>
    )
}
