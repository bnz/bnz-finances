import cx from "../../helpers/cx"
import { useToggles } from "../TogglesProvider"

export function MenuButton() {
    const [menu, , toggle] = useToggles("menu")

    return (
        <button onClick={toggle} className={cx(
            "absolute left-0 top-0 bottom-0 !p-0 !m-0",
            "icon",
            menu ? "cancel" : "menu",
            "before:top-0 before:bottom-0 before:h-auto",
            // "before:w-1/2",
        )} />
    )
}
