import Image from "next/image";

export default function CharacterHeader({character}) {

    return (
        <div className="header">
            <div className="headerTitle"><h1>{character.name.toUpperCase()}</h1><div className="fullSeparator"></div>
                <div className="headerInfo"><span>{character.title}</span></div>
            </div>
            <div className="headerContent"><Image alt={'Background art for ' + character.name} width={2000} height={2000} className="headerImage" src={character.backgroundImage}/></div>
        </div>
    )
}