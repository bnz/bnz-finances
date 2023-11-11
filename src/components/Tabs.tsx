import cx from "../helpers/cx"
import { useState } from "react"

type Tab = Record<"title", string>

type TabVariants = "contained" | "outlined" | "underline"

interface TabsProps {
    defaultSelected?: number
    className?: string
    onChange(index: number, tab: Tab): void
    tabs: Tab[]
    tabVariant?: TabVariants
}

const classesMap: Record<string, [width: string, beforeWidth: string, beforeLeft: string[]]> = {
    "50.00": ["w-1/2", "before:w-1/2", [
        "before:left-0",
        "before:left-1/2",
    ]],
    "33.33": ["w-1/3", "before:w-1/3", [
        "before:left-0",
        "before:left-1/3",
        "before:left-2/3",
    ]],
    "25.00": ["w-1/4", "before:w-1/4", [
        "before:left-0",
        "before:left-1/4",
        "before:left-2/4",
        "before:left-3/4",
    ]],
    "20.00": ["w-1/5", "before:w-1/5", [
        "before:left-0",
        "before:left-[20%]",
        "before:left-[40%]",
        "before:left-[60%]",
        "before:left-[80%]",
    ]],
}

const tabVariants: Record<TabVariants, string> = {
    outlined: "before:rounded before:border before:border-[--text-color]",
    contained: "before:rounded before:bg-[--background-color-alt]",
    underline: "before:border-b-4 before:border-[--text-color]",
}

export function Tabs({ className, defaultSelected = 0, onChange, tabs, tabVariant = "contained" }: TabsProps) {
    const [selected, setSelected] = useState(defaultSelected)
    const [width, beforeWidth, beforeLeft] = classesMap[(100 / tabs.length).toFixed(2)]

    return (
        <div className={cx(
            "relative",
            "flex",
            "before:absolute",
            "before:top-0",
            "before:left-0",
            "before:h-full",
            "before:-z-0",
            "before:transition-all",
            beforeWidth,
            beforeLeft[selected],
            tabVariants[tabVariant],
            className,
        )}>
            {tabs.map(function (tab, index) {
                const { title } = tab
                return (
                    <button key={index} className={cx("relative", "rounded", width)}
                        onClick={function () {
                            setSelected(index)
                            onChange(index, tab)
                        }}
                    >
                        {title}
                    </button>
                )
            })}
        </div>
    )
}
