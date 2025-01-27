import { useState, useEffect, useRef } from "react";
import onKeyPress from "../components/OnKeyPress.jsx";
import "../styles/AddWord.css";


const EditWord = ( {close, editThatWord, oldEnglish, oldJapanese, oldPartOfSpeech, oldChapter, oldChapterName} ) => {
    const [english, setEnglish] = useState(oldEnglish)
    const [japanese, setJapanese] = useState(oldJapanese)
    const [partOfSpeech, setPartOfSpeech] = useState(oldPartOfSpeech)
    const [chapterNumber, setChapterNumber] = useState(oldChapter)
    const [chapterName, setChapterName] = useState(oldChapterName)
    //show error if some fields aren't filled out
    const [unfilledFieldsError, setUnfilledFieldsError] = useState("")

    //useRef to focus on the first text field when opened using shortcuts
    const focusedFieldWhenOpened = useRef(null)

    //sends the information from the text fields back to the main vocabulary page
    const handleWordChange = () => {
        if (english.trim() === "" || japanese.trim() === "" || partOfSpeech.trim() === "" || chapterNumber.toString().trim() === "" || chapterName.trim() === "") {
            setUnfilledFieldsError("Please fill out all the fields")
            return
        }
        console.log(chapterName)
        console.log(chapterNumber)
        editThatWord(english, japanese, partOfSpeech, chapterNumber, chapterName)
        close()
    }

    //handles keyboard shortcuts to close the popup
    const handleEnter = () => {
        handleWordChange()
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
                <h1>Edit Word</h1>
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
                <input type="submit" onClick={handleWordChange} /> 
                {unfilledFieldsError && <div className="field-error"><p>{unfilledFieldsError}</p></div>}
            </div>
        </div>
    )
}

export default EditWord