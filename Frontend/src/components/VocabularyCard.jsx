    import EditWord from "../components/EditWord.jsx"
    import "../styles/VocabularyCard.css"
    import { useState } from "react"
    import axios from 'axios';

    const VocabularyCard = ( {id, english, japanese, partOfSpeech, chapter, chapterName, isEditing, handleTheEdit, handleTheDeletion} ) => {
        //const [shownWord, setShownWord] = useState(japanese)
        const [isEnglish, setEnglish] = useState(false)
        const [editWord, toggleEditWord] = useState(false)

        //toggle between english and japanese words
        const flip = () => {
            setEnglish(!isEnglish)
        }

        const backUpToVocabulary = (newEnglish, newJapanese, newPartOfSpeech, newChapter, newChapterName) => {
            handleTheEdit(id, newEnglish, newJapanese, newPartOfSpeech, newChapter, newChapterName)
        }

        const backDeleteVocabulary = (id) => {
            handleTheDeletion(id)
        }

        return(
            <>
                <div className="flip">
                    <div className={`card chapter-${chapter} ${chapterName} ${(isEnglish && !isEditing) ? 'is-flipped' : ''}`} id={id} onClick={flip}>
                        <div className={`vocabularyTile front ${!isEditing ? "hover" : ""}`} >
                            <button className={`edit-button-x ${isEditing ? "shown" : ""}`} onClick={() => toggleEditWord(true)}><img src="../edit-icon.png" /></button>
                            <h1>{japanese}</h1>
                        </div>
                        <div className="vocabularyTile back"><h1>{english}</h1></div>
                    </div>
                </div>
                {editWord && (
                    <div className="dimmed-background">
                        <EditWord close={() => toggleEditWord(false)} editThatWord={backUpToVocabulary} deleteThatWord={backDeleteVocabulary}
                        id={id} oldEnglish={english} oldJapanese={japanese} oldPartOfSpeech={partOfSpeech} oldChapter={chapter} oldChapterName={chapterName} />
                    </div>
                )}
            </>
        )
    }

    export default VocabularyCard

