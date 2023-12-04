import cx from "../helpers/cx"
import { commonClassName } from "./Header"

export function Divider() {
    return (
        <div className={cx(commonClassName, "h-5")} />
    )
}
