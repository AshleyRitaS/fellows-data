export default function CharacterHeader({character}) {

    return (
        <div className="header">
            <div className="headerTitle"><h1>{character.name.toUpperCase()}</h1><div className="fullSeparator"></div>
                <div className="headerInfo"><span>{character.title}</span></div>
            </div>
            <div className="headerContent"><img className="headerImage" src={character.backgroundImage}></img></div>
        </div>
    )
}