import Image from "next/image";

export default function MainHeader() {

    return (
        <div className="header">
            <div className="headerTitle"><h1>FellowTools</h1><div className="fullSeparator"></div>
                <div className="headerInfo"><span>Tools and Data to Improve your Fellowship Gameplay</span></div>
            </div>
            <div className="headerContent"><Image alt={'Background art for FellowTools; points at the menu'} width={2000} height={2000} className="headerImage" src="/images/main_background.png"/></div>
        </div>
    )
}