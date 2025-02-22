import Ability from './Ability'
export default function AbilityList({abilities})
{
    var output = abilities.map((ability) => {
        return (<Ability ability={ability}/>)
    }).reduce((acc, cur) => acc === null ? cur : <>{acc} {cur}</>, null);

    return (
        <>
        <h2 className="abilityTitle">Abilities</h2>
        <div className="fullSeparator"></div>
        {output}
        </>
    )
}