import { useDispatch, useSelector } from "react-redux";
import { selectAllPullIDs, selectCurrentPull, newPull, pullEnemy, deletePull } from "@/app/_state/_dungeon/dungeonSlice";
import PullComponent from "./PullComponent";
import RouteProgressBar from "./RouteProgressBar";
import Draggable from "react-draggable";
import { useRef } from "react";


export default function CurrentRouteView({draggable}) {
    var dispatch = useDispatch();
    var pullIDs = useSelector(selectAllPullIDs);

    var pullElements = pullIDs.reduce((acc, cur) => {
        return <>{acc} <PullComponent id={cur}/></>
    }, <></>)

    var draggableRef = useRef();

    var output = (
        <div ref={draggableRef} className="routeView">
            <h2>Route</h2>
            <RouteProgressBar />
            <div>
            {pullElements}
            </div>
            <span className="newPull" onClick={() => dispatch(newPull())}> + New Pull</span>
        </div>
    )

    if (draggable) {
        output = (<Draggable nodeRef={draggableRef}>{output}</Draggable>)
    }

    return output;
}