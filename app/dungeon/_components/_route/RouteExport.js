'use client'
import { selectDungeonInfo, selectSaveStateExport } from "@/app/_state/_dungeon/dungeonSlice";
import { useSelector } from "react-redux";
import Modal from 'react-modal'
import { useState, useRef } from "react";

export default function RouteExport() {
    var exportString = useSelector(selectSaveStateExport);
    var dungeonInfo = useSelector(selectDungeonInfo);
    var [isOpen, setIsOpen] = useState(false);
    var textRef = useRef();
    var textRefURL = useRef();
    var textRefDiscordURL = useRef();

    var getURL = function() {
        try {
            return window.location.protocol + '//' + window.location.hostname +  window.location.pathname + '?route='+exportString;
        } catch {
            
        }
    }

    return (
        <>
            <button onClick={()=>{setIsOpen(true);}}>Export</button>
            <Modal shouldCloseOnOverlayClick={true} onRequestClose={()=>{setIsOpen(false)}} onAfterOpen={()=>{textRef.current.select()}} ariaHideApp={false} className="modal" overlayClassName="modalBackground" isOpen={isOpen}>
                <div>
                    <textarea className="import" ref={textRef} readOnly value={exportString}></textarea>
                </div>
                <button onClick={()=>{textRef.current.select(); document.execCommand('copy')}} >Copy Export String</button>
                <div>
                    <textarea className="import" ref={textRefURL} readOnly value={getURL()}></textarea>
                </div>

                <button onClick={()=>{textRefURL.current.select(); document.execCommand('copy')}} >Copy URL</button>
                <div>
                    <textarea className="import" ref={textRefDiscordURL} readOnly value={'['+dungeonInfo.name+ ' FellowTools Route](' + getURL() + ')'}></textarea>
                </div>

                <button onClick={()=>{textRefDiscordURL.current.select(); document.execCommand('copy')}} >Copy Discord Link</button>



                <button onClick={()=>setIsOpen(false)}>Close</button>
            </Modal>
        </>
    )
}