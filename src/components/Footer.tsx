import cx from "../helpers/cx"
import { Row } from "./Row"
import { commonClassName } from "./Layout"
import { useItems } from "./ItemsProvider"

export function Footer() {
    const [items] = useItems()

    return (
        <Row title="Всего:"
            sum={items.reduce(function (prev, { sum }) {
                return prev + sum
            }, 0)}
            Tag="footer"
            className={cx(
                commonClassName,
                "border-t-4",
                "bg-[var(--background-color-alt)]"
            )}
        />
    )
}
