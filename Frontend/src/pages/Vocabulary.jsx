import NavBar from "../components/NavBar.jsx";
import VocabularyCard from "../components/VocabularyCard.jsx";
import VocabularyChapter from "../components/VocabularyChapter.jsx";
import ToTopButton from "../components/ToTopButton.jsx";
import AddWord from "../components/AddWord.jsx";
import OnKeyPress from "../components/OnKeyPress.jsx"
import "../styles/Vocabulary.css"
import { useState, useEffect } from "react";
import axios from 'axios';


const Vocabulary = () => {
    //create a function in order to populate the vocabulary word tiles
    const [words, setWords] = useState([]);
    const [addWord, toggleAddWord] = useState(false)
    const [editWords, toggleEditWords] = useState(false)
    
    //fetch the words when the vocabulary site loads
    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/load_vocabulary_words')
                setWords(response.data)
            }
            catch (e) {
                console.error(e)
            }
        }
        fetchWords()
    }, [])
    
    //when a new word is added, pass to the backend, then add onto the words hook list
    const handleNewWord = async (english, japanese, partOfSpeech, chapterNumber, chapterName) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/add_vocabulary_word', {
                english, 
                japanese, 
                partOfSpeech, 
                chapterNumber: parseInt(chapterNumber), 
                chapterName
            })
            
            if (response.status === 200) {
                const newWord = response.data.word

                setWords((prevWords) => [... prevWords, {
                    idwords: newWord.idwords,
                    english: newWord.english || english,
                    japanese: newWord.japanese || japanese,
                    partOfSpeech: newWord.partOfSpeech || partOfSpeech,
                    vocabularyChapter: newWord.vocabularyChapter || chapterNumber,
                    vocabularyChapterName: newWord.vocabularyChapterName || chapterName,
                }])
            }
            else {
                console.error("failed to add the word", response.data)
            }
        }
        catch(e) {
            console.error("error adding word", e)
        }
    }

    //need to find a way to find the key of the word in the backend first before changing it because the 
    //id of the words are all messed up. (each id starts at 0 when starting a new chapter)
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

    //when the site loads, take all of the words and group them based on vocabulary chapter names
    const groupIntoChapters = words.reduce((acc, word) => {
        const vocabularyChapter = word.vocabularyChapter
        const vocabularyChapterName = word.vocabularyChapterName
        if (!acc[vocabularyChapter]) {
            acc[vocabularyChapter] = {
                chapterName: vocabularyChapterName,
                words: [],
            }
        }
        acc[vocabularyChapter].words.push(word)
        return acc
    }, {})
    
    const editing = () => {
        toggleEditWords(!editWords)
    }
    OnKeyPress(['e'], editing, {shift : true})
    
    // handles the shortcut for adding a new word
    const handleAddWordPress = () => {
        toggleAddWord(true)
    } 
    OnKeyPress(['a'], handleAddWordPress, {shift : true})
    
    return (
        <>
            <NavBar />

            <div className="workspace-of-words">
                {Object.entries(groupIntoChapters).length > 0 ? (
                    Object.entries(groupIntoChapters).map(([chapterId, { chapterName, words }]) => (
                        <VocabularyChapter key={chapterId} id={chapterId} chapterName={chapterName}>
                            {words.map((word) => (
                                <VocabularyCard key={word.idwords} id={word.idwords} english={word.english} japanese={word.japanese} partOfSpeech={word.partOfSpeech} chapter={word.vocabularyChapter} chapterName={word.vocabularyChapterName} isEditing={editWords}/>
                            ))}
                        </VocabularyChapter>
                    ))
                ) : (<p>No words found ...</p>)}
            </div>
            <button className="edit-button" onClick={editing}><img src="../edit-icon.png" /></button>
            <button className="add-button" onClick={() => toggleAddWord(true)}><h1>+</h1></button>
            <ToTopButton />
            {addWord && (
                <div className="dimmed-background">
                    <AddWord close={() => toggleAddWord(false)} addNewWord={handleNewWord} />
                </div>
            )}
        </>
    );
}

export default Vocabulary;