

const VocabularyCard = ( {english, japanese} ) => {
    return(
        <>
            <div className="vocabularyTile">
                <h1>{english}</h1>
                <h1>{japanese}</h1>
            </div>
        </>
    )
}

export default VocabularyCard

