import data from '@/app/_util/data';
import DungeonMap from '../_components/DungeonMap';

export default async function Dungeon({params}) {
    const {slug} = await params;
    const dungeon = await data.getDungeon(slug)
    return (
        <>
        <DungeonMap dungeon={dungeon}/>
        </>
    )
}