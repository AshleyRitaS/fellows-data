import Image from "next/image"

export default function Ability({ability}) {
    function AbilityType({isUltimate, isActive}) {
        if (isUltimate) {
            return <span className="abilityType abilityUltimate">Ultimate</span>
        } else if (isActive) {
            return <span className="abilityType abilityActive">Regular Ability</span>
        } else {
            return <span className="abilityType abilityInactive">Inactive; possibly unused</span>
        }
    }
    var cooldown = <></>
    var levelEarned = <></>
    var charges = <></>
    var range = <></>
    if (ability.cooldown) {
        cooldown = (<span className="cooldown">{ability.cooldown}s Cooldown</span>)
    } else if (ability.chargeCD) {
        cooldown = (<span className="cooldown">{ability.cooldown}s Cooldown</span>)
    }
    if (ability.charges > 1) {
        charges = (<span className="charges">{ability.charges} charges</span>)
    }
    if (ability.levelLearned > 0) {
        levelEarned = (<span className="level">Earned after dungeon rank: {ability.levelLearned - 1}</span>)
    }
    if (ability.range) {
        range = <span className="range">{ability.range/100}yd range</span>
    }
    return (
        <div className="abilityDiv">
            <div className="nameInfoDiv">
                <h3 className="abilityName">{ability.name}</h3> {levelEarned}
                <span className="abilityInfo">{range}{charges}{cooldown}</span>
            </div>
            <div className="thickSeparator"></div>
            
            <span className="iconContainer"><Image alt={'Icon art for '+ability.name} width={100} height={100} src={ability.icon}/></span>
            <div className="abilityText" dangerouslySetInnerHTML={{__html:ability.description || ''}}></div>
            
        </div>
    )
}