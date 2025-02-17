'use client'
import { useRef } from "react";
import { useLayoutEffect } from "react";


export default function({talent, position, ref}) {

    useLayoutEffect(()=> {
        if (position) {
            ref.current.style.bottom = position.y + 'px';
            ref.current.style.left = position.x + 'px';
        }

        var rect = ref.current.getBoundingClientRect();
        if (rect.top < 0) {
            ref.current.style.top -= rect.top;
        } else if (rect.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
            ref.current.style.top -= (rect.bottom - (window.innerHeight || document.documentElement.clientHeight));
        }
        
        if (rect.left < 0) {
            ref.current.style.left -= rect.left;
        } else if (rect.right > (window.innerWidth || document.documentElement.clientWidth)) {
            ref.current.style.left -= (rect.right - (window.innerWidth || document.documentElement.clientWidth));
        }
    })

    return (
        <div className="talentTooltip" ref={ref}>
            <h2 className="tooltipTitle">{talent.name}</h2>
            <div className="fullSeparator extraMargin"></div>
            <div className="tooltipDescription"  dangerouslySetInnerHTML={{__html:talent.description}}></div>
            <div className="fullSeparator extraMargin"></div>
            <div className="tooltipInfo">Upgrade Cost: {talent.cost}</div>
        </div>
    )
}