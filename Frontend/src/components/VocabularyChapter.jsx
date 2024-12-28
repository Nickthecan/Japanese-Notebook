import "../styles/VocabularyChapter.css"

const VocabularyChapter = ( {id, chapterName, children} ) => {
    return(
        <>
            <h1 className="chapter-name">{chapterName}</h1>
            <div className="vocabularyChapter" id={id}>
                {children}
            </div>
        </>
    )
}

export default VocabularyChapter