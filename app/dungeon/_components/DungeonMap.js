'use client'
import DungeonComponentContainer from "./DungeonComponentContainer";
import SelectedEnemyView from "./SelectedEnemyView";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { initialize, selectCurrentMap } from "@/app/_state/_dungeon/dungeonSlice";
import { useDispatch, useSelector } from "react-redux";
import CurrentRouteView from "./_route/CurrentRouteView";
import { useEffect, useRef, useState } from "react";
import DungeonHeader from "./_header/DungeonHeader";
import MapSelector from "./MapSelector";
import MapExpander from "./MapExpander";
import Image from "next/image";
import RouteExport from "./_route/RouteExport";
import RouteImport from "./_route/RouteImport";



export default function DungeonMap({dungeon}) {
    var initialized = useRef(false);
    var containerRef = useRef();
    var dispatch = useDispatch();
    if (!initialized.current) {
        dispatch(initialize(dungeon))
        initialized.current = true;
    }
    var currentMap = useSelector(selectCurrentMap);
    var unExpander = () => {
        containerRef.current.classList.remove('expand');
        setExpanded(false);
        console.log('remove;')
    }
    var expander = () => {
        containerRef.current.classList.add('expand');
        setExpanded(true);
        console.log('add')
    }

    var expandAction;

    var [expanded, setExpanded] = useState(false);
    if (expanded) {
        expandAction = unExpander;
    } else {
        expandAction = expander;
    }


    return (<>
        <DungeonHeader />
        <div className="mapContainer" ref={containerRef}>
            <SelectedEnemyView draggable={expanded} />
            <div className="mapTransformWrapper">
                <MapSelector />
                <div className="expander">
                    <MapExpander action={expandAction}/>
                    <RouteExport />
                    <RouteImport />
                </div>
            <TransformWrapper limitToBounds={false}>
                <TransformComponent >
                <Image alt={'Map of ' + dungeon.name} width={2000} height={1000} className="dungeonMap" src={currentMap?.icon}/>
                </TransformComponent>
                <DungeonComponentContainer>
                </DungeonComponentContainer>
            </TransformWrapper>
            </div>
            <CurrentRouteView draggable={expanded} />
        </div>
        </>)
}