'use client'
import { useDispatch, useSelector } from "react-redux";
import { createSelectEnemyByID, newEnemy, pullEnemy, createSelectPullByEnemyID, createSelectEnemyByIDAllMaps } from '@/app/_state/_dungeon/dungeonSlice';
import pullColors from "../_utils/pullColors";

export default function ComponentIcon({enemyID}) {
    var enemy = useSelector(createSelectEnemyByIDAllMaps(enemyID));
    var pull = useSelector(createSelectPullByEnemyID(enemyID))
    var color = 'black'
    if (pull >= 0) {
        color = pullColors[pull]
    }
    var dispatch = useDispatch();

    return (
        <span onClick={()=>{dispatch(pullEnemy(enemy.id)); console.log(enemy.id)}} onMouseEnter={()=>dispatch(newEnemy(enemy.id))} className={"componentIcon " + enemy.className}><img style={{"borderColor":color}}src={enemy.icon}/></span>
    )
}