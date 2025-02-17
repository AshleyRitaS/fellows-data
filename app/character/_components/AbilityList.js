import Ability from './Ability'
export default function AbilityList({abilities})
{
    return abilities.map((ability) => {
        return (<Ability ability={ability}/>)
    }).reduce((acc, cur) => acc === null ? cur : <>{acc} {cur}</>, null);
}