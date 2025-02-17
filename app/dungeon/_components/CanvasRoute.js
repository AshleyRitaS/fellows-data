import { selectAllPullIDs, selectAllPullInfo, selectAllPullInfoCurrentMap, selectCurrentMap, selectRouteInfo } from "@/app/_state/_dungeon/dungeonSlice";
import { useSelector } from "react-redux";
import convexHull from '@/app/dungeon/_utils/convexHull'
import {useRef} from 'react'
import { useEffect } from "react";
import dungeonScale from '@/app/dungeon/_utils/dungeonComponentScaling'
import pullColors from "../_utils/pullColors";

export default function CanvasRoute({transformState, parentRect}) {
    var mapInfo = useSelector(selectCurrentMap);
    var pullInfo = useSelector(selectAllPullInfoCurrentMap);
    console.log(pullInfo)
    var canvasRef = useRef();



    var convexHullPaths = pullInfo.map((val) => {
        return convexHull(val.locations);
    })

    useEffect(()=> {
        var ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        convexHullPaths.forEach((val, pullID)=> {
            if(val.length < 3 ) {
                return;
            }
            var convertedCoords = val.map((path) => {
                return path.map((e)=> {
                    var localCoords = dungeonScale.transformToLocal(e, parentRect, mapInfo.fullRectSpace, mapInfo.originOffset);
                    return {
                        x:(localCoords.x * transformState.scale) + transformState.positionX,
                        y:(localCoords.y * transformState.scale) + transformState.positionY
                    }
                })
            })
            
            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.strokeStyle = pullColors[pullID] || 'black'
            convertedCoords.forEach((node) => {
                ctx.moveTo(node[0].x, node[0].y)
                ctx.lineTo(node[1].x, node[1].y)
            })
            ctx.closePath();
            ctx.fillStyle = (pullColors[pullID] || '#000000')
            ctx.fill();
            ctx.stroke();
        })
    })

    return <canvas width={parentRect.x} height={parentRect.y} className="routeCanvas" ref={canvasRef}/>
}