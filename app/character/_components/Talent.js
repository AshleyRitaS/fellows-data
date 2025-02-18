'use client'
import Image from "next/image";
import TalentTooltip from "./TalentTooltip";
import { useRef } from "react";


export default function({talent}) {
    var tooltipRef = useRef();
    console.log(talent)

    return (
        <div className="talent">
            <div onMouseEnter={()=>tooltipRef.current.style.visibility = 'visible'} onMouseLeave={()=>tooltipRef.current.style.visibility = 'hidden'}>
                <span className="talentCost">{talent.cost}</span>
                <span className="talentIcon">
                    <Image alt={'Icon art for '+talent.name} height={100} width={100} src={talent.icon || null}/>
                </span>
                <span className="talentName">{talent.name}</span>
            </div>
            <TalentTooltip ref={tooltipRef} talent={talent} position={{x:64, y:64}} />
        </div>
    )
}