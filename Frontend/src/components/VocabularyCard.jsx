import "../styles/VocabularyCard.css"
import { useState } from "react"

const VocabularyCard = ( {id, english, japanese, chapter, chapterName} ) => {
    //const [shownWord, setShownWord] = useState(japanese)
    const [isEnglish, setEnglish] = useState(false)

    //toggle between english and japanese words
    const flip = () => {
        setEnglish(!isEnglish)
    }

    return(
        <>
            <div className="flip">
                <div className={`card chapter-${chapter} ${chapterName} ${isEnglish ? 'is-flipped' : ''}`} id={id} onClick={flip}>
                    <div className="vocabularyTile front" ><h1>{japanese}</h1></div>
                    <div className="vocabularyTile back"><h1>{english}</h1></div>
                </div>
            </div>
        </>
    )
}

export default VocabularyCard

