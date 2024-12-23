import NavBar from "../components/NavBar.jsx";
import VocabularyCard from "../components/VocabularyCard.jsx";
import VocabularyChapter from "../components/VocabularyChapter.jsx";
import "../styles/Vocabulary.css"
import { useState, useEffect } from "react";
import axios from 'axios';


const Vocabulary = () => {
    //create a function in order to populate the vocabulary word tiles
    const [words, setWords] = useState([]);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const words = await axios.get('/get_vocabulary_words')
                setWords(words.data)
            }
            catch (e) {
                console.error(e)
            }
        }
        fetchWords()
    }, [])

    return (
        <>
            <NavBar />
            <VocabularyChapter 
                {words.map((word) => {
                    <VocabularyCard english={word.english} japanese={word.japanese}/>
                })}
            />
        </>
    );
}

export default Vocabulary;