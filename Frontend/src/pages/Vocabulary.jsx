import NavBar from "../components/NavBar.jsx";
import VocabularyCard from "../components/VocabularyCard.jsx";
import VocabularyChapter from "../components/VocabularyChapter.jsx";
import ToTopButton from "../components/ToTopButton.jsx";
import AddWord from "../components/AddWord.jsx";
import "../styles/Vocabulary.css"
import { useState, useEffect } from "react";
import axios from 'axios';


const Vocabulary = () => {
    //create a function in order to populate the vocabulary word tiles
    const [words, setWords] = useState([]);
    const [addWord, toggleAddWord] = useState(false)

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
                const newWord = response.data.word;
                setWords((prevWords) => [... prevWords, newWord])
            }
            else
                console.error("failed to add the word", response.data)
        }
        catch(e) {
            console.error("error adding word", e)
        }
    }

    const groupIntoChapters = words.reduce((acc, word) => {
        const { vocabularyChapter, vocabularyChapterName } = word;
        if (!acc[vocabularyChapter]) {
            acc[vocabularyChapter] = {
                chapterName: vocabularyChapterName,
                words: [],
            }
        }
        acc[vocabularyChapter].words.push(word)
        return acc
    }, {})


    return (
        <>
            <NavBar />
            
            <div className="workspace-of-words">
                {Object.entries(groupIntoChapters).length > 0 ? (
                    Object.entries(groupIntoChapters).map(([chapterId, { chapterName, words }]) => (
                        <VocabularyChapter key={chapterId} id={chapterId} chapterName={chapterName}>
                            {words.map((word, idx) => (
                                <VocabularyCard key={idx} id={idx} english={word.english} japanese={word.japanese}/>
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