'use client'
import { useLayoutEffect, useRef } from 'react';
import dungeonScale from '../_utils/dungeonComponentScaling';
import ComponentIcon from './ComponentIcon';
import { KeepScale, useTransformContext, useTransformEffect } from 'react-zoom-pan-pinch';
import { useSelector } from 'react-redux';
import { createSelectEnemyByID, selectCurrentMap } from '@/app/_state/_dungeon/dungeonSlice';
import { useState } from 'react';



export default function DungeonEnemy({enemyID, parentRect, transformState}) {
    var enemy = useSelector(createSelectEnemyByID(enemyID));
    var map = useSelector(selectCurrentMap);
    var location = enemy.location;
    var localCoords = dungeonScale.transformToLocal(location, parentRect, map.fullRectSpace, map.originOffset);
    var spanRef = useRef(null);



    useLayoutEffect(() => {
        if (spanRef) {
            spanRef.current.style.left = (localCoords.x * transformState.scale) + transformState.positionX +  - spanRef.current.offsetWidth/2 + "px";
            spanRef.current.style.top = (localCoords.y * transformState.scale) + transformState.positionY - spanRef.current.offsetHeight/2+ "px";
        }
    })

    return (
        <span className="dungeonComponent" ref={spanRef}>
                <ComponentIcon enemyID={enemyID}/>
        </span>
    )
}