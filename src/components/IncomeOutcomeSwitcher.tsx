import { saveToggles, useToggle, useToggles } from "./TogglesProvider"
import cx from "../helpers/cx"
import { commonClassName } from "./Header"
import { Tabs } from "./Tabs"

export function IncomeOutcomeSwitcher() {
    const menu = useToggle("menu")
    const [type, setType] = useToggles("type")

    return (
        <Tabs
            tabVariant="contained"
            className={cx(
                commonClassName,
                "bg-main sticky z-10 h-12",
                menu ? "top-[136px]" : "top-14",
            )}
            defaultSelected={type as number}
            tabs={[
                { title: "Доходы" },
                { title: "Расходы" },
            ]}
            onChange={function (index) {
                setType(index as any)
                saveToggles({ type: index })
            }}
        />
    )
}
