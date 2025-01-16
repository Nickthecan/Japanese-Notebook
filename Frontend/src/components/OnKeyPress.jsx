import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const onKeyPress = (keys, callback, modifiers, node = null) => {
    const callbackRef = useRef(callback)

    useLayoutEffect(() => {
        callbackRef.current = callback
    })

    const handleKeyPress = useCallback((e) => {
        const keyDown = keys.some((key) => e.key.toLowerCase() === key.toLowerCase())
        const shiftKey = modifiers.shift === undefined || modifiers.shift === e.shiftKey

        if (keyDown && shiftKey) {
            e.preventDefault()
            callbackRef.current(e)
        }
    }, [keys, modifiers])
    
    useEffect(() => {
        const targetNode = node ?? document
        targetNode && targetNode.addEventListener("keydown", handleKeyPress)

        return() => targetNode && targetNode.removeEventListener("keydown", handleKeyPress)
    }, [handleKeyPress, node])
}

export default onKeyPress