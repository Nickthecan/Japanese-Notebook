import "../styles/VocabularyCard.css"
import { useState } from "react"

const VocabularyCard = ( {id, english, japanese, chapter, chapterName} ) => {
    const [shownWord, setShownWord] = useState(japanese)
    const [isEnglish, setEnglish] = useState(false)

    //toggle between english and japanese words
    const flip = () => {
        if (!isEnglish) {
            setShownWord(english)
            setEnglish(true)
        }
        else {
            setShownWord(japanese)
            setEnglish(false)
        }
    }

    return(
        <>
            <div className={`vocabularyTile chapter-${chapter} ${chapterName}`} id={id} onClick={flip}>
                <h1>{shownWord}</h1>
            </div>
        </>
    )
}

export default VocabularyCard

