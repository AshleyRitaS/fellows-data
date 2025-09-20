'use client'
import { useDispatch, useSelector } from "react-redux";
import { createSelectEnemyByID, newHoverGroup, newEnemy, pullEnemy, createSelectPullByEnemyID, createSelectEnemyByIDAllMaps, pullEnemySingle, selectCurrentGroup } from '@/app/_state/_dungeon/dungeonSlice';
import pullColors from "../_utils/pullColors";
import Image from "next/image";

export default function ComponentIcon({enemyID, usePatrols=true}) {
    var enemy = useSelector(createSelectEnemyByIDAllMaps(enemyID));
    var pull = useSelector(createSelectPullByEnemyID(enemyID))
    var color = 'black'
    var group = useSelector(selectCurrentGroup);
    console.log('currentGroup', group)
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

    function onMouseEnter(e) {
        if (enemy.className !== 'patrolNode') {
            dispatch(newEnemy(enemy.id));
        }
        dispatch(newHoverGroup(enemy.group))
    }

    if (!usePatrols && enemy?.className === 'patrolNode') {
        return <></>
    }

    return (
        <span onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={()=>{dispatch(newHoverGroup(-1))}}className={"componentIcon " + (enemy?.className || '') + ' ' + (enemy?.group === group ? 'hovered' : '')}>
            <Image height={20} width={20} alt="Icon for enemy" style={{"borderColor":color}}src={enemy?.icon}/>
        </span>
    )
}