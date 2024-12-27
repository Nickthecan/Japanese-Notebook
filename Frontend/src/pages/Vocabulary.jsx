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

    return (
        <>
            <NavBar />
            {/* need to create a new id for what vocab chapter each word is in */}
            <div className="workspace-of-words">
                <VocabularyChapter>
                    {words.length > 0 ? words.map((word, idx) => (
                        <VocabularyCard key={idx} id={idx} english={word.english} japanese={word.japanese}/>
                    )) : <p>No Words Found...</p>}
                </VocabularyChapter>
            </div>
        </>
    );
}

export default Vocabulary;