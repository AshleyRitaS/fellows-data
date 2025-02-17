'use client'

import { selectAllMapIDs, selectCurrentMapID, setMap } from "@/app/_state/_dungeon/dungeonSlice"
import { useDispatch, useSelector, } from "react-redux"

export default function MapSelector() {
    var maps = useSelector(selectAllMapIDs);
    var currentMapID = useSelector(selectCurrentMapID);
    var dispatch = useDispatch();
    var options = maps.reduce((acc, cur, index) => {
        return <>{acc} <option value={cur}>Layer {index}</option></>
    }, <></>)

    return(
        <select className="mapSelector" value={currentMapID} onChange={(e)=>{dispatch(setMap(e.target.value))}}>
            {options}
        </select>
    )
}