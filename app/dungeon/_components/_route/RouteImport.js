'use client'
import { selectSaveStateExport } from "@/app/_state/_dungeon/dungeonSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from 'react-modal'
import { useState, useRef } from "react";
import { importPulls } from "@/app/_state/_dungeon/dungeonSlice";
import { useEffect } from "react";

export default function RouteImport() {
    var [isOpen, setIsOpen] = useState(false);
    var textRef = useRef();
    var dispatch = useDispatch();
    var hasImported = useRef(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('route') && !hasImported.current) {
            hasImported.current = true;
            dispatch(importPulls(params.get('route')))
        }
    })

    return (
        <>
            <button onClick={()=>{setIsOpen(true);}}>Import</button>
            <Modal shouldCloseOnOverlayClick={true} onRequestClose={()=>{setIsOpen(false)}}  onAfterOpen={()=>{textRef.current.select()}} ariaHideApp={false} className="modal" overlayClassName="modalBackground"  isOpen={isOpen}>
                <div>
                    <textarea className="import" ref={textRef}></textarea>
                </div>
                <button onClick={()=>{setIsOpen(false); dispatch(importPulls(textRef.current.value))}}>Import & Close</button>
            </Modal>
        </>
    )
}