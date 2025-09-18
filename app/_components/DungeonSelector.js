import Image from "next/image";
import data from '@/app/_util/data';

export default async function DungeonSelector({dungeon}) {

    var dungeons = await data.getDungeons();

    return (
        <div className="header">
            
        </div>
    )
}