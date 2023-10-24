import { useEffect, useState } from 'react';
import { isLogged, storageKey } from '../Passcode';

export function LogoutButton() {
    const [visible, setVisible] = useState(false)
    useEffect(function () {
        setVisible(isLogged())
    }, [setVisible])

    if (!visible) {
        return null
    }

    return (
        <button className="absolute top-0 bottom-0 right-0" onClick={function () {
            localStorage.removeItem(storageKey)
        }}>
            logout
        </button>
    )
}