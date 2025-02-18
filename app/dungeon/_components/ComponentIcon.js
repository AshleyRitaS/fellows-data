'use client'
import { useDispatch, useSelector } from "react-redux";
import { createSelectEnemyByID, newEnemy, pullEnemy, createSelectPullByEnemyID, createSelectEnemyByIDAllMaps, pullEnemySingle } from '@/app/_state/_dungeon/dungeonSlice';
import pullColors from "../_utils/pullColors";
import Image from "next/image";

export default function ComponentIcon({enemyID}) {
    var enemy = useSelector(createSelectEnemyByIDAllMaps(enemyID));
    var pull = useSelector(createSelectPullByEnemyID(enemyID))
    var color = 'black'
    if (pull >= 0) {
        color = pullColors[pull]
    }
    var dispatch = useDispatch();
    function onClick(e) {
        if (e.ctrlKey) {
            dispatch(pullEnemySingle(enemy.id))
        } else {
            dispatch(pullEnemy(enemy.id))
        }
    }

    return (
        <span onClick={onClick} onMouseEnter={()=>dispatch(newEnemy(enemy.id))} className={"componentIcon " + enemy.className}>
            <Image height={20} width={20} alt="Icon for enemy" style={{"borderColor":color}}src={enemy.icon}/>
        </span>
    )
}