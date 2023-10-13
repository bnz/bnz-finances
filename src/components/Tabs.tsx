import { saveToggles, useToggle, useToggles } from "./TogglesProvider"
import cx from "../helpers/cx"
import { TypeOfItem } from "./dnd/Dnd"
import { commonClassName } from "./Header"

function Tab({ typeOfItem, title }: { typeOfItem: TypeOfItem, title: string }) {
    const [type, setType] = useToggles("type")

    return (
        <button
            onClick={function () {
                setType(typeOfItem as any)
                saveToggles({ type: typeOfItem })
            }}
            className={cx("w-1/2 py-3",
                type === typeOfItem && "bg-[var(--background-color-alt)] font-bold",
            )}
        >
            {title}
        </button>
    )
}

export function Tabs() {
    const menu = useToggle("menu")

    return (
        <div className={cx("flex sticky z-10",
            "bg-[var(--background-color)]",
            menu ? "top-[136px]" : "top-14",
            commonClassName,
        )}>
            <Tab title="Расходы" typeOfItem={TypeOfItem.outcome} />
            <Tab title="Доходы" typeOfItem={TypeOfItem.income} />
        </div>
    )
}
