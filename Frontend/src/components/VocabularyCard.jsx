import "../styles/VocabularyCard.css"
import { useEffect, useState } from "react"

const VocabularyCard = ( {english, japanese} ) => {
    const [shownWord, setShownWord] = useState(japanese)
    const [isEnglish, setEnglish] = useState(false)



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
            <div className="vocabularyTile" onClick={flip}>
                <h1>{shownWord}</h1>
            </div>
        </>
    )
}

export default VocabularyCard

