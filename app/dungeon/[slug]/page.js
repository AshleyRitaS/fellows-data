import data from '@/app/_util/data';
import DungeonMap from '../_components/DungeonMap';

export async function generateStaticParams() {
    var characters = await data.getDungeons();
    var paths = characters.map((e)=> {
        return {params:{slug:e.id}}
    })
    
    console.log('paths ', paths)
    return paths
}


export default async function Dungeon({params}) {
    const {slug} = await params;
    const dungeon = await data.getDungeon(slug)
    return (
        <>
        <DungeonMap dungeon={dungeon}/>
        <p className="dungeonPSA">You can drag the map with left click, or zoom in/out with scrollwheel. You can also Ctrl + click to select a single mob from a pack.</p>
        </>
    )
}