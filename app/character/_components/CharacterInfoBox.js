'use client'
import Image from "next/image";
import { useCollapse } from "react-collapsed";

export default function CharacterInfoBox ({character, children}){
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
        <div className="characterInfoBox">
            <div className="stats">Role: {character.role} <img className="roleImage" src={character.roleIcon} /> &#183; Difficulty: {character.difficulty}</div>
            <div className="fullSeparator extraMargin"></div>
            <Image alt={'Character portrait for '+character.name} width={500} height={500} className="characterPortrait" src={character.icon || null}/>
            {children}
            

            
        </div>
    )
}

//            <div className="loreControls"><a {...getToggleProps()}className="toggle">Show/Hide Lore</a></div>
//<div className="lore" {...getCollapseProps()}><div className="description">{character.description}</div> {character.lore}</div>