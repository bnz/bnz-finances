import { useEffect, useRef } from "react"

export const useOutsideClick = function <T = HTMLDivElement>(callback: VoidFunction) {
    const ref = useRef<T | null>(null)

    useEffect(function () {
        function handleClickOutside(event: MouseEvent) {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return function () {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref, callback])

    return ref
}
