'use client'
import { useState } from "react"
import ItemController from "./ItemController";
import ItemSet from "./ItemSet";

export default function ItemMain({items, characters, dungeonID}) {
    
    console.log(items)
    items = items.filter(e=> {
        return dungeonID === e.dungeonID;
    })
    var itemsByCharacter = {};
    characters.forEach(element => {
        itemsByCharacter[element.id] = [];
    });
    items.forEach(element => {
        console.log(element)
        element.characters.forEach(character => {
            console.log(element)
            itemsByCharacter[character].push(element);
        })
    })

    var [currentCharacter, setCurrentCharacter] = useState();

    var getOnClick = function(characterID) {
        return function() {
            setCurrentCharacter(characterID)
        }
    }
    var controls = <></>
    var itemSets = <></>

    for(const [key, value] of Object.entries(itemsByCharacter)) {
        controls = <>{controls}<ItemController onClick={getOnClick(key)} characterName={key} /></>
        itemSets = <>{itemSets}<ItemSet items={value} visible={currentCharacter === key}/></>
    }

    return (
        <>
            <div className="itemControls">{controls}</div>
            <div className="itemSets">{itemSets}</div>
        </>
    )
}