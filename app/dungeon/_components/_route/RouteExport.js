'use client'
import { selectSaveStateExport } from "@/app/_state/_dungeon/dungeonSlice";
import { useSelector } from "react-redux";
import Modal from 'react-modal'
import { useState, useRef } from "react";

export default function RouteExport() {
    var exportString = useSelector(selectSaveStateExport);
    var [isOpen, setIsOpen] = useState(false);
    var textRef = useRef();
    var textRefURL = useRef();

    var getURL = function() {
        return window.location.protocol + '//' + window.location.hostname +  window.location.pathname + '?route='+exportString;
    }

    return (
        <>
            <button onClick={()=>{setIsOpen(true);}}>Export</button>
            <Modal shouldCloseOnOverlayClick={true} onRequestClose={()=>{setIsOpen(false)}} onAfterOpen={()=>{textRef.current.select()}} ariaHideApp={false} className="modal" overlayClassName="modalBackground" isOpen={isOpen}>
                <div>
                    <textarea className="import" ref={textRef} readOnly value={exportString}></textarea>
                </div>
                <button onClick={()=>{textRef.current.select(); document.execCommand('copy')}} >Copy To Clipboard</button>
                <div>
                    <textarea className="import" ref={textRefURL} readOnly value={getURL()}></textarea>
                </div>

                <button onClick={()=>{textRefURL.current.select(); document.execCommand('copy')}} >Copy To Clipboard</button>

                <button onClick={()=>setIsOpen(false)}>Close</button>
            </Modal>
        </>
    )
}