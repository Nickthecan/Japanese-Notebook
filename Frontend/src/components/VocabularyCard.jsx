    import EditWord from "../components/EditWord.jsx"
    import "../styles/VocabularyCard.css"
    import { useState } from "react"
    import axios from 'axios';

    const VocabularyCard = ( {id, english, japanese, partOfSpeech, chapter, chapterName, isEditing} ) => {
        //const [shownWord, setShownWord] = useState(japanese)
        const [isEnglish, setEnglish] = useState(false)
        const [editWord, toggleEditWord] = useState(false)

        //toggle between english and japanese words
        const flip = () => {
            setEnglish(!isEnglish)
        }

        const handleEditedWord = async (idwords, english, japanese, partOfSpeech, chapterNumber, chapterName) => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/edit_vocabulary_word', {
                    idwords,
                    english, 
                    japanese, 
                    partOfSpeech, 
                    chapterNumber: parseInt(chapterNumber), 
                    chapterName
                })

                if (response.status === 200) {
                    const newWord = response.data.word

                    setWords((prevWords) => [... prevWords, {
                        idwords: newWord.idwords || idwords,
                        english: newWord.english || english,
                        japanese: newWord.japanese || japanese,
                        partOfSpeech: newWord.partOfSpeech || partOfSpeech,
                        vocabularyChapter: newWord.vocabularyChapter || chapterNumber,
                        vocabularyChapterName: newWord.vocabularyChapterName || chapterName,    
                    }])
                }
                else {
                    console.error("failed to edit the word", response.data)
                }
            }
            catch(e) {
                console.error("error editing word", e)
            }
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
                        <EditWord close={() => toggleEditWord(false)} editThatWord={handleEditedWord}  
                        oldEnglish={english} oldJapanese={japanese} oldPartOfSpeech={partOfSpeech} oldChapter={chapter} oldChapterName={chapterName} />
                    </div>
                )}
            </>
        )
    }

    export default VocabularyCard

