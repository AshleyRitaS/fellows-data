import { changePull, createSelectPull, createSelectPullInfo, deletePull, selectCurrentPullID, selectDungeonInfo } from "@/app/_state/_dungeon/dungeonSlice";
import { useSelector, useDispatch } from "react-redux";
import ComponentIcon from "../ComponentIcon";

export default function PullComponent({id}) {
    var pull = useSelector(createSelectPull(id))
    var pullInfo = useSelector(createSelectPullInfo(id))
    var dungeonInfo = useSelector(selectDungeonInfo);
    var scorePercent = pullInfo.score / dungeonInfo.score * 100;
    var isSelected = (useSelector(selectCurrentPullID)) == id;
    var dispatch = useDispatch();

    var enemies = pull.reduce((acc, cur) => {
        return <>{acc} <ComponentIcon enemyID={cur}></ComponentIcon></>
    }, <></>)
    return (
        <>
            <div className={'pullComponent '+ (isSelected ? 'selectedPull' : '')} onClick={()=>dispatch(changePull(id))} >
                <h3>Pull {id} <span className="deleteButton"><a href="#" onClick={(e) => {dispatch(deletePull(id)); e.stopPropagation()}}>[x]</a></span></h3>
                <div className="pullStats"><p>Score: {pullInfo.score}</p><p>{scorePercent.toFixed(3)}%</p></div>
                {enemies}
            </div>
        </>
    )
}