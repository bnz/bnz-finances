import { Tabs, TabsProps } from "../Tabs"
import { useMonths } from "../ItemsProvider"
import { TogglesInterface, useToggles } from "../TogglesProvider"
import { useCallback } from "react"
import { TabOptions } from "./TabOptions"

export function MonthsTabs() {
    const months = useMonths()
    const [activeMonth, setActiveMonth] = useToggles("activeMonth") as TogglesInterface["activeMonth"]
    const onChange: TabsProps["onChange"] = useCallback(function (index, { title }) {
        setActiveMonth(title)
    }, [setActiveMonth])

    const defaultSelected = months.findIndex(function ({ title }) {
        return title === activeMonth
    })

    return (
        <Tabs
            defaultSelected={defaultSelected}
            tabVariant="outlined"
            className="h-10 my-3 mx-2 md:mx-0 flex-1"
            tabs={months}
            onChange={onChange}
            adaptToMobiles
            RenderTabFn={function ({ children, selected }) {
                const [month, year] = children.split("-")
                return (
                    <>
                        {month}
                        <sup className="ml-1 text-[10px] hidden md:inline">
                            {year}
                        </sup>
                        {selected && (
                            <TabOptions />
                        )}
                    </>
                )
            }}
        />
    )
}
