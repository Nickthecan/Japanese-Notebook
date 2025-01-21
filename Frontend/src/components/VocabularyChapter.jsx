import "../styles/VocabularyChapter.css"

const VocabularyChapter = ( {id, chapterName, children} ) => {
    return(
        <div className={`chapter ${chapterName}`}>
            <h1 className="chapter-name">{chapterName}</h1>
            <div className="vocabularyChapter" id={id}>
                {children}
            </div>
        </div>
    )
}

export default VocabularyChapter