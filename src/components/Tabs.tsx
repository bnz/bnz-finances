import cx from "../helpers/cx"
import { JSX, useMemo, useState } from "react"

type Tab = Record<"title", string>

type TabVariants = "contained" | "outlined" | "underline"

const classesMap: Record<string, [width: string, beforeWidth: string, beforeLeft: string[]]> = {
    "Infinity": ["w-full", "before:w-full", [
        "before:left-0",
    ]],
    "100.00": ["w-full", "before:w-full", [
        "before:left-0",
    ]],
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
    "16.67": ["w-1/6", "before:w-1/6", [
        "before:left-0",
        "before:left-[16.67%]",
        "before:left-[33.34%]",
        "before:left-[50%]",
        "before:left-[66.68%]",
        "before:left-[83.35%]",
    ]],
}

const tabVariants: Record<TabVariants, string> = {
    outlined: "before:rounded before:border before:border-[--text-color]",
    contained: "before:rounded before:bg-main-alt",
    underline: "before:border-b-4 before:border-[--text-color]",
}

export interface TabsProps {
    defaultSelected?: number
    className?: string
    onChange(index: number, tab: Tab): void
    tabs: Tab[]
    tabVariant?: TabVariants
    RenderTabFn?(props: { children: string, selected: boolean }): JSX.Element
    adaptToMobiles?: boolean
}

export function Tabs({
    className, defaultSelected = 0, onChange, tabs, tabVariant = "contained",
    adaptToMobiles,
    RenderTabFn = function ({ children }) {
        return <>{children}</>
    },
}: TabsProps) {
    const [selected, setSelected] = useState(defaultSelected)
    const [width, beforeWidth, beforeLeft] = useMemo(function () {
        return classesMap[(Math.round((100 / tabs.length || 1) * 100) / 100).toFixed(2)]
    }, [tabs])

    return (
        <ul className={cx(
            adaptToMobiles ? "" : cx(
                "flex",
                "before:absolute",
                "before:top-0",
                "before:left-0",
                "before:h-full",
                "before:-z-0",
                "before:transition-all",
                "before:duration-200",
                beforeWidth,
                beforeLeft[selected],
            ),
            "relative",
            tabVariants[tabVariant],
            className,
        )}>
            {tabs.map(function (tab, index) {
                const { title } = tab
                return (
                    <li
                        key={index}
                        className={cx("cursor-pointer flex items-center justify-center relative rounded group/button", width)}
                        onClick={function () {
                            setSelected(index)
                            onChange(index, tab)
                        }}
                    >
                        <RenderTabFn selected={selected === index}>
                            {title}
                        </RenderTabFn>
                    </li>
                )
            })}
        </ul>
    )
}
