import NavBar from "../components/NavBar.jsx";
import VocabularyCard from "../components/VocabularyCard.jsx";
import "../styles/Vocabulary.css"
import { useState, useEffect } from "react";
import axios from 'axios';


const Vocabulary = () => {
    //create a function in order to populate the vocabulary word tiles
    const [words, setWords] = useState(null);

    useEffect(() => {
        axios.get('')
    })

    return (
        <>
            <NavBar />
            <VocabularyCard english='englsih' japanese='nihongo'/>
        </>
    );
}

export default Vocabulary;