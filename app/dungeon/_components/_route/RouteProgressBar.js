import { selectAllPullIDs, selectDungeonInfo, selectRouteInfo } from "@/app/_state/_dungeon/dungeonSlice";
import { useSelector } from "react-redux";

export default function RouteProgressBar() {
    var routeInfo = useSelector(selectRouteInfo);
    var dungeonInfo = useSelector(selectDungeonInfo);

    return (
        <div className="routeProgress">
            <span className="routeScore">{routeInfo.score}/{dungeonInfo.score}</span><span className="routePercent">{(routeInfo.score/dungeonInfo.score * 100).toFixed(3)}%</span>
            <progress className="routeProgressBar" max={dungeonInfo.score} value={routeInfo.score}></progress>
        </div>
    )
}