'use client'
import { useSelector, } from "react-redux"
import { selectCurrentEnemy, selectCurrentEnemyID } from "@/app/_state/_dungeon/dungeonSlice"
import Draggable from "react-draggable";
import { useRef } from "react";

export default function SelectedEnemyView({draggable}) {
    const currentEnemy=useSelector(selectCurrentEnemy);
    if (process.env.NODE_ENV == "development") {
        var extraDetails = (<><p>ID: {currentEnemy?.id}</p><p>Group: {currentEnemy?.group}</p>
            <p>Loc: {JSON.stringify(currentEnemy?.location)}</p>
        </>)
    }

    var draggableRef = useRef();

    var output = (
        <div ref={draggableRef} className="currentEnemyView">
            <img src={currentEnemy?.icon}/>
            <div className="currentEnemyStats">
                <h4 className="currentEnemyName">{currentEnemy?.name}</h4>
                <p>Score: {currentEnemy?.score}</p>
                <p>Health: {Math.floor(currentEnemy?.health)}</p>
                {extraDetails || <></>}
            </div>
        </div>
    )
    
    
    if (draggable) {
        output = (<Draggable nodeRef={draggableRef}>{output}</Draggable>)
    }

    return output;
}