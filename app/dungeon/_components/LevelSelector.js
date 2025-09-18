'use client'

import { selectMaxLevel, selectLevel, changeLevel } from "@/app/_state/_dungeon/dungeonSlice"
import { useDispatch, useSelector, } from "react-redux"

export default function LevelSelector() {
    var maxLevel = useSelector(selectMaxLevel);
    var currentLevel = useSelector(selectLevel);
    var dispatch = useDispatch();

    return(
        <input type="number" min="0" max={maxLevel} value={currentLevel} onChange={(e)=>dispatch(changeLevel(e.target.value))}></input>
    )
}