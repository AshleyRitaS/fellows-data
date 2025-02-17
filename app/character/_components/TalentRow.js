import Talent from "./Talent";


export default function ({talentRow}) {
    console.log('row ',talentRow)

    var talents = talentRow.map(e=> {
        return <Talent talent={e}/>
    })
    console.log(talents)
    var output = talents.reduce((acc, cur)=> {
        if (acc === null) {
            return cur;
        } else {
            return <>{acc}<span className="verticalSeparator"></span>{cur}</>
        }
    }, null)

    return (
        <div className="talentRow">
            {output}
        </div>
    )
}