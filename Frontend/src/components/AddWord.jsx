import { useState } from "react";
import "../styles/AddWord.css";


const AddWord = ( {close, addNewWord} ) => {
    const [english, setEnglish] = useState("")
    const [japanese, setJapanese] = useState("")
    const [partOfSpeech, setPartOfSpeech] = useState("")
    const [chapterNumber, setChapterNumber] = useState("")
    const [chapterName, setChapterName] = useState("")

    const [unfilledFieldsError, setUnfilledFieldsError] = useState("")

    const handleWordCreation = () => {
        if (english.trim() === "" || japanese.trim() === "" || partOfSpeech.trim() === "" || chapterNumber.trim() === "" || chapterName.trim() === "") {
            setUnfilledFieldsError("Please fill out all the fields")
            return
        }
        addNewWord(english, japanese, partOfSpeech, chapterNumber, chapterName)
        close()
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleWordCreation()
        }
    }


    return (
        <div className="add-word-container">
            <div className="title">
                <h1>Add a Word</h1>
                <button className="close-popup" onClick={close}>X</button>
            </div>
            <div className="inputs-for-new-word">
                <input type="text" placeholder="English" value={english} onChange={(e) => setEnglish(e.target.value)} onKeyDown={handleEnter} />
                <input type="text" placeholder="Japanese" value={japanese} onChange={(e) => setJapanese(e.target.value)} onKeyDown={handleEnter} />
                <input type="text" placeholder="Part of Speech" value={[partOfSpeech]} onChange={(e) => setPartOfSpeech(e.target.value)} onKeyDown={handleEnter} />
                <input type="text" placeholder="Chapter Number" value={chapterNumber} onChange={(e) => setChapterNumber(e.target.value)} onKeyDown={handleEnter} />
                <input type="text" placeholder="Chapter Name" value={chapterName} onChange={(e) => setChapterName(e.target.value)} onKeyDown={handleEnter} />
            </div>
            {unfilledFieldsError && <div className="field-error"><p>{unfilledFieldsError}</p></div>}
            <div className="submit-word">
                <input type="submit" onClick={handleWordCreation} /> 
            </div>
        </div>
    )
}

export default AddWord