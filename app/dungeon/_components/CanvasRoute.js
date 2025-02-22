import { selectAllPullIDs, selectAllPullInfo, selectAllPullInfoCurrentMap, selectCurrentMap, selectCurrentPullID, selectRouteInfo } from "@/app/_state/_dungeon/dungeonSlice";
import { useSelector } from "react-redux";
import convexHull from '@/app/dungeon/_utils/convexHull'
import {useRef} from 'react'
import { useEffect } from "react";
import dungeonScale from '@/app/dungeon/_utils/dungeonComponentScaling'
import pullColors from "../_utils/pullColors";

export default function CanvasRoute({transformState, parentRect}) {
    var mapInfo = useSelector(selectCurrentMap);
    var pullInfo = useSelector(selectAllPullInfoCurrentMap);
    var currentPullID = useSelector(selectCurrentPullID);
    console.log(pullInfo)
    var canvasRef = useRef();



    var convexHullPaths = pullInfo.map((val) => {
        return convexHull(val.locations);
    })

    useEffect(()=> {
        var ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        console.log(currentPullID, convexHullPaths)
        convexHullPaths.forEach((val, pullID)=> {
            if(val.length < 3 ) {
                return;
            }
            var convertedCoords = val.map((path) => {
                    var localCoords = dungeonScale.transformToLocal(path, parentRect, mapInfo.fullRectSpace, mapInfo.originOffset);
                    return {
                        x:(localCoords.x * transformState.scale) + transformState.positionX,
                        y:(localCoords.y * transformState.scale) + transformState.positionY
                    }
            })
            
            ctx.beginPath();
            console.log(currentPullID, pullID)
            if (currentPullID == pullID) {
                ctx.setLineDash([15, 5])
                console.log('selected')
            } else {
                ctx.setLineDash([0])
            }
            ctx.lineWidth = 3;
            ctx.strokeStyle = pullColors[pullID] || 'black'
            ctx.moveTo(convertedCoords[0].x, convertedCoords[0].y)
            convertedCoords.forEach((node) => {
                ctx.lineTo(node.x, node.y)
            })
            ctx.closePath();
            ctx.fillStyle = (pullColors[pullID] + '50' || '#000000')
            ctx.fill();
            ctx.stroke();
        })
    })

    return <canvas width={parentRect.x} height={parentRect.y} className="routeCanvas" ref={canvasRef}/>
}