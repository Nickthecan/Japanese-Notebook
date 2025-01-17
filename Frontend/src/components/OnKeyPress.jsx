import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const onKeyPress = (keys, callback, modifiers, node = null) => {
    //callback ref pattern
    const callbackRef = useRef(callback)

    useLayoutEffect(() => {
        callbackRef.current = callback
    })

    const handleKeyPress = useCallback((e) => {
        //check to see if a certain key is pressed
        const keyDown = keys.some((key) => e.key.toLowerCase() === key.toLowerCase())
        //check to see if the shift key is pressed for a shortcut
        const shiftKey = modifiers.shift === undefined || modifiers.shift === e.shiftKey

        if (keyDown && shiftKey) {
            e.preventDefault()
            callbackRef.current(e)
        }
    }, [keys, modifiers])
    
    useEffect(() => {
        //target is either the provided node or the document
        const targetNode = node ?? document
        //attach event listener
        targetNode && targetNode.addEventListener("keydown", handleKeyPress)
        //remove it afterwards
        return() => targetNode && targetNode.removeEventListener("keydown", handleKeyPress)
    }, [handleKeyPress, node])
}

export default onKeyPress