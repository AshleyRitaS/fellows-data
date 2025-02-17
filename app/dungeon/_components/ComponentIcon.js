'use client'
import { useDispatch, useSelector } from "react-redux";
import { createSelectEnemyByID, newEnemy, pullEnemy, createSelectPullByEnemyID, createSelectEnemyByIDAllMaps } from '@/app/_state/_dungeon/dungeonSlice';
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

    return (
        <span onClick={()=>{dispatch(pullEnemy(enemy.id));}} onMouseEnter={()=>dispatch(newEnemy(enemy.id))} className={"componentIcon " + enemy.className}>
            <Image height={20} width={20} alt="Icon for enemy" style={{"borderColor":color}}src={enemy.icon}/>
        </span>
    )
}