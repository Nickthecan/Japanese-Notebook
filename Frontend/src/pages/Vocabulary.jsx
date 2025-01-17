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
    
    //fetch the words when the vocabulary site loads
    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/load_vocabulary_words')
                setWords(response.data)
                console.log("words found set", response.data)
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
                console.log(newWord)

                setWords((prevWords) => [... prevWords, {
                    newWord,
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
                            {words.map((word, idx) => (
                                <VocabularyCard key={idx} id={idx} english={word.english} japanese={word.japanese} chapter={word.vocabularyChapter} chapterName={word.vocabularyChapterName}/>
                            ))}
                        </VocabularyChapter>
                    ))
                ) : (<p>No words found ...</p>)}
            </div>
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