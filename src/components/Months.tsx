import { commonClassName } from "./Header"
import cx from "../helpers/cx"
import { Tabs } from "./Tabs"

export function Months() {
    return (
        <div className={cx(commonClassName)}>
            <Tabs
                tabVariant="outlined"
                className="h-10 my-3 mx-2 md:mx-0"
                tabs={[
                    { title: "Ноябрь" },
                    { title: "Декабрь" },
                    { title: "Январь" },
                    { title: "Февраль" },
                    { title: "Март" },
                ]}
                onChange={function (index, tab) {
                }}
            />
        </div>
    )
}
