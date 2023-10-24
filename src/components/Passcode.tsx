import md5 from "md5"
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Header } from './Header';
import cx from '../helpers/cx';

export const storageKey = "auth-key"

export function isLogged(): boolean {
    try {
        const key = localStorage.getItem(storageKey)
        return key !== null && md5(key.toLowerCase()) === KEY
    } catch (e) {
        console.error(e)
        return false
    }
}

export const KEY = "7e354618ae7c06319a12036baa35ace9"

interface PasscodeProps {
    callback: Dispatch<SetStateAction<boolean>>
}

export function Passcode({ callback }: PasscodeProps) {
    const [logged, setLogged] = useState(false)
    const onChange = useCallback(function (e: ChangeEvent<HTMLInputElement>) {
        if (md5(e.target.value.toLowerCase()) === KEY) {
            setLogged(true)
            setTimeout(function () {
                callback(true)
                localStorage.setItem(storageKey, e.target.value)
            }, 3000)
        }
    }, [callback, setLogged])

    return (
        <>
            <Header />
            <div className={cx(
                "absolute top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 w-72 h-24 flex items-center justify-center opacity-100",
                logged ? "animate-fade-in" : "animate-fade-out",
            )}>
                <div className="animate-pulse text-7xl">🥰</div>
            </div>
            <form className={cx(
                "shadow absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 flex flex-col gap-3 w-72 h-24 opacity-0",
                logged ? "animate-fade-out" : "animate-fade-in",
            )}>
                <h3 className="text-center">🔑 Пароль 😘</h3>
                <input type="text" className="input text-center" autoFocus onChange={onChange} />
            </form>
        </>
    )
}
