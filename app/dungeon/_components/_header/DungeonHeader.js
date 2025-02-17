import { selectDungeonInfo } from "@/app/_state/_dungeon/dungeonSlice";
import { useSelector } from "react-redux";


export default function DungeonHeader() {
    var dungeonInfo = useSelector(selectDungeonInfo);
    var minutes = Math.floor(dungeonInfo.timer / 60).toString().padStart(2, '0');
    var seconds = Math.floor(dungeonInfo.timer % 60).toString().padStart(2, '0')

    return (
        <div className="header">
            <div className="headerTitle"><h1>{dungeonInfo.name.toUpperCase()}</h1><div className="fullSeparator"></div>
                <div className="headerInfo"><span>{dungeonInfo.type}</span>&#183;<span><span className="timer"></span>{minutes}:{seconds}</span>&#183;<span>Kill Score: {dungeonInfo.score}</span></div>
            </div>
            <div className="headerContent"><img className="headerImage" src={dungeonInfo.loadingScreen}></img></div>
        </div>
    )
}