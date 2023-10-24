import { lazy, Suspense, useEffect, useState } from 'react';
import { isLogged, Passcode } from './Passcode';

const AppWithProviders = lazy(function () {
    return import('./AppWithProviders')
})

export function StartPage() {
    const [auth, setAuth] = useState(false)

    console.log(1, isLogged())

    useEffect(function () {
        console.log(2, isLogged())
        setAuth(isLogged())
    }, [setAuth])

    if (!auth) {
        return <Passcode callback={setAuth} />
    }

    return (
        <Suspense fallback={<div>loading...</div>}>
            <AppWithProviders />
        </Suspense>
    )
}