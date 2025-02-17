'use client'
import { useEffect, useRef, useState } from "react";
import DungeonEnemy from "./DungeonEnemy";
import { useSelector } from "react-redux";
import { selectCurrentMap } from "@/app/_state/_dungeon/dungeonSlice";
import { useTransformEffect } from "react-zoom-pan-pinch";
import CanvasRoute from "./CanvasRoute";

export default function DungeonComponentContainer({children}) {
    var [width, setWidth] = useState(300);
    var [height, setHeight] = useState(200);
    var sizeRef = useRef(null);
    var map = useSelector(selectCurrentMap);
    var enemies = map.components;
    console.log(enemies);
    var [transformState, setTransformState] = useState({scale:1,positionX:0,positionY:0});

    useTransformEffect((state) => {
        setTransformState({...state.state})
    });

    useEffect(() => {
        var resizeObserver = null;
        if (resizeObserver === null) {
            resizeObserver = new ResizeObserver((event) => {
                if (event[0].contentRect.width != width || event[0].contentRect.height != height) {
                    setWidth(event[0].contentRect.width)
                    setHeight(event[0].contentRect.height)
                }
            })
        }

        if (sizeRef) {
            resizeObserver.observe(sizeRef.current);
        }

        return () => {resizeObserver.disconnect()}
    }, [width, height])

    enemies = enemies || [];
    var enemyOutput = enemies.map((enemy) => {
        return (
            <DungeonEnemy enemyID={enemy.id} parentRect={{x:width, y:height}} transformState={transformState} />
        )
    }).reduce((acc, cur) => acc === null ? cur : <>{acc} {cur}</>, <></>)

    return (
        <div ref={sizeRef} className="dungeonMapContainer">
            {children}
            <CanvasRoute transformState={transformState} parentRect={{x:width, y:height}}/>
            {enemyOutput}
        </div>
    )
}