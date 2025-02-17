'use client'
import TalentTooltip from "./TalentTooltip";
import { useRef } from "react";


export default function({talent}) {
    var tooltipRef = useRef();
    console.log(talent)

    return (
        <div className="talent">
            <div onMouseEnter={()=>tooltipRef.current.style.visibility = 'visible'} onMouseLeave={()=>tooltipRef.current.style.visibility = 'hidden'}>
            <span className="talentIcon"><img src={talent.icon || null}/></span><span className="talentName">{talent.name}</span>
            </div>
            <TalentTooltip ref={tooltipRef} talent={talent} position={{x:64, y:64}} />
        </div>
    )
}