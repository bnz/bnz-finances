import cx from "../helpers/cx"
import { commonClassName } from "./Layout"

export function Header() {
    return (
        <header className={cx("sticky top-0 select-none text-center bg-[var(--background-color)] shadow h-14", commonClassName)}>
            <h1 className="relative h-14">
                    <span className="text-gradient font-thin text-3xl">
                        Ю. <span className="text-xl ">и</span> Ю.
                    </span>
                <span className={cx(
                    "text-gradient",
                    "font-thin text-xs",
                    "absolute bottom-1 left-1/2 -translate-x-1/2",
                )}>финансы</span>
            </h1>
        </header>
    )
}