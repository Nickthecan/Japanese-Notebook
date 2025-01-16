import { useState, useEffect, useRef } from "react";
import onKeyPress from "../components/OnKeyPress.jsx";
import "../styles/AddWord.css";


const AddWord = ( {close, addNewWord} ) => {
    const [english, setEnglish] = useState("")
    const [japanese, setJapanese] = useState("")
    const [partOfSpeech, setPartOfSpeech] = useState("")
    const [chapterNumber, setChapterNumber] = useState("")
    const [chapterName, setChapterName] = useState("")

    const [unfilledFieldsError, setUnfilledFieldsError] = useState("")

    const focusedFieldWhenOpened = useRef(null)

    const handleWordCreation = () => {
        if (english.trim() === "" || japanese.trim() === "" || partOfSpeech.trim() === "" || chapterNumber.trim() === "" || chapterName.trim() === "") {
            setUnfilledFieldsError("Please fill out all the fields")
            return
        }
        console.log(chapterName)
        console.log(chapterNumber)
        addNewWord(english, japanese, partOfSpeech, chapterNumber, chapterName)
        close()
    }

    const handleEnter = () => {
        handleWordCreation()
    }

    const handleClose = () => {
        close()
    }

    onKeyPress(['Enter'], handleEnter, {})
    onKeyPress(['Escape'], handleClose, {})

    useEffect(() => {
        if (focusedFieldWhenOpened.current) {
            focusedFieldWhenOpened.current.focus()
        }
    }, [])


    return (
        <div className="add-word-container">
            <div className="title">
                <h1>Add a Word</h1>
                <button className="close-popup" onClick={close}>x</button>
            </div>
            <div className="inputs-for-new-word">
                <input type="text" placeholder="English" value={english} onChange={(e) => setEnglish(e.target.value)} ref={focusedFieldWhenOpened}/>
                <input type="text" placeholder="Japanese" value={japanese} onChange={(e) => setJapanese(e.target.value)} />
                <input type="text" placeholder="Part of Speech" value={partOfSpeech} onChange={(e) => setPartOfSpeech(e.target.value)} />
                <input type="text" placeholder="Chapter Number" value={chapterNumber} onChange={(e) => setChapterNumber(e.target.value)} />
                <input type="text" placeholder="Chapter Name" value={chapterName} onChange={(e) => setChapterName(e.target.value)} />
            </div>
            <div className="submit-word">
                <input type="submit" onClick={handleWordCreation} /> 
                {unfilledFieldsError && <div className="field-error"><p>{unfilledFieldsError}</p></div>}
            </div>
        </div>
    )
}

export default AddWord