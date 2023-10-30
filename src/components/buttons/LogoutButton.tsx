import { useEffect, useState } from 'react'
import { isLogged, storageKey } from '../Passcode'
import cx from "../../helpers/cx"

export function LogoutButton() {
    const [visible, setVisible] = useState(false)
    useEffect(function () {
        setVisible(isLogged())
    }, [setVisible])

    if (!visible) {
        return null
    }

    return (
        <button
            className={cx(
                "absolute top-0 bottom-0 right-0",
                "icon logout before:top-1/2 before:-translate-y-1/2",
            )}
            onClick={function () {
                localStorage.removeItem(storageKey)
                window.location.reload()
            }}
        />
    )
}
