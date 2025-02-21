import data from '@/app/_util/data';
import ItemMain from '../_components/ItemMain';
import ItemHeader from '../_components/ItemHeader';

export async function generateStaticParams() {
    var characters = await data.getDungeons();
    var paths = characters.map((e)=> {
        return {params:{slug:e.id}}
    })
    
    console.log('paths ', paths)
    return paths
}


export default async function DungeonLoot({params}) {
    const {slug} = await params;
    const dungeon = await data.getDungeon(slug)
    const items = await data.getItems(slug)
    const characters = await data.getCharacters();
    
    return (
        <>
        <ItemHeader dungeonInfo={dungeon}/>
        <ItemMain items={items} characters={characters} dungeonID={dungeon.id}/>
        </>
    )
}