import data from '@/app/_util/data';
import DropdownNav from './DropdownNav';

export default async function NavBar() {
    var characters = await data.getCharacters();
    var dungeons = await data.getDungeons();

    var characterLinks = characters.map((e)=>{
        return {
            href:'/character/' + e.id,
            name:e.name
        }
    })
    var dungeonLinks = dungeons.map((e)=>{
        return {
            href:'/dungeon/' + e.id,
            name:e.name
        }
    })

    return (
        <div className="navBar">
            <DropdownNav links={characterLinks} title="Characters" />
            <DropdownNav links={dungeonLinks} title="Dungeons" />
        </div>
    )
}