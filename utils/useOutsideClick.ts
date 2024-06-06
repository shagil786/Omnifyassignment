import { RefObject, useEffect, useState } from "react";

export default function useOutsideClick(ref: RefObject<HTMLElement>, initialChange?: boolean) {
    const [isClickOutside, setIsClickOutside] = useState(initialChange);

    function onMouseDown(event: any) {
        if(ref.current && !ref?.current?.contains(event?.target)) {
            setIsClickOutside(true);
            return;
        }

        setIsClickOutside(false);
    }

    useEffect(() => {
        document.addEventListener('mousedown', onMouseDown);
        return () => document.removeEventListener('mousedown', onMouseDown);
    })

    return isClickOutside;
}