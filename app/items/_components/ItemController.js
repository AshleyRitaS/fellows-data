

export default function ItemController({characterName, onClick}) {
    return (
        <span className="itemFilterButton" onClick={onClick}>{characterName}</span>
    )
}