import cx from "../helpers/cx"
import { Row } from "./Row"
import { useItems } from "./ItemsProvider"
import { commonClassName } from "./Header"

export function Footer() {
    const [items] = useItems()

    if (items.length <= 0) {
        return null
    }

    return (
        <Row title="Всего:" color={null}
            sum={items.reduce(function (prev, { sum }) {
                return prev + sum
            }, 0)}
            Tag="footer"
            className={cx(
                commonClassName,
                "border-t-4",
                "bg-[var(--background-color-alt)]",
                "sticky bottom-0"
            )}
        />
    )
}
