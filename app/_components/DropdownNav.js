'use client'

import Link from "next/link"
import { useRef } from "react"

export default function({links, title}) {
    var dropdownRef = useRef()

    var output = links.reduce((acc, cur)=> {
        return (
            <>
                {acc}
                <Link className="navLink" href={cur.href}>{cur.name}</Link>
            </>
        )
    }, <></>)

    var onMouseEnter = function(e) {
        dropdownRef.current.style.visibility='visible'
    }
    var onMouseExit = function(e) {
        dropdownRef.current.style.visibility='hidden'
    }

    return (
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseExit} className="navContainer">
            <div className="navHeader">{title}</div>
            <div ref={dropdownRef} className="dropDownNav">
                {output}
            </div>
        </div>
    )
}