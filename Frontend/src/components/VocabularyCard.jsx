import "../styles/VocabularyCard.css"
import { useState } from "react"

const VocabularyCard = ( {id, english, japanese, chapter, chapterName, isEditing} ) => {
    //const [shownWord, setShownWord] = useState(japanese)
    const [isEnglish, setEnglish] = useState(false)

    //toggle between english and japanese words
    const flip = () => {
        setEnglish(!isEnglish)
    }

    const editThatWord = () => {
        
    }

    return(
        <>
            <div className="flip">
                <div className={`card chapter-${chapter} ${chapterName} ${(isEnglish && !isEditing) ? 'is-flipped' : ''}`} id={id} onClick={flip}>
                    <div className={`vocabularyTile front ${!isEditing ? "hover" : ""}`} >
                        <button className={`edit-button-x ${isEditing ? "shown" : ""}`} onClick={editThatWord}><img src="../edit-icon.png" /></button>
                        <h1>{japanese}</h1>
                    </div>
                    <div className="vocabularyTile back"><h1>{english}</h1></div>
                </div>
            </div>
        </>
    )
}

export default VocabularyCard

