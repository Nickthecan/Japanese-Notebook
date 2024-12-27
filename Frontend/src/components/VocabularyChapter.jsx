import "../styles/VocabularyChapter.css"

const VocabularyChapter = ( {id, children} ) => {
    return(
        <div className="vocabularyChapter" id={id}>
            {children}
        </div>
    )
}

export default VocabularyChapter