'use client'
import TalentRow from "./TalentRow";


export default function ({talents, ref}) {
    var talentRowData = [];
    talents.forEach(element => {
        var level = element.level;
        if (!talentRowData[level]) {
            talentRowData[level] = [];
        }
        talentRowData[level].push(element);
    });
    var talentRows = talentRowData.map((e) => {
        return <TalentRow talentRow={e}/>
    })

    var output = talentRows.reduce((acc, cur) => {
        if (acc === null) {
            return cur;
        } else {
            return <>{acc}<div className="fullSeparator"/>{cur}</>
        }
    }, null)

    return (
        <div className="talentBlock" ref={ref}>
            {output}
        </div>
    )
}