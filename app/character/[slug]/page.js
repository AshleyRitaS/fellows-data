import CharacterHeader from '../_components/CharacterHeader';
import AbilityList from '../_components/AbilityList';
import data from '@/app/_util/data';
import CharacterInfoBox from '../_components/CharacterInfoBox';
import TalentBlock from '../_components/TalentBlock';

export async function generateStaticParams() {
    var characters = await data.getCharacters();
    console.log()
    var paths = characters.map((e)=> {
        return {params:{slug:e.id}}
    })
    
    console.log('paths ', paths)
    return paths
}

export default async function Character({params}) {
    const {slug} = await params;
    console.log(slug)
    const character = await data.getCharacter(slug)
    return (
        <>
        <CharacterHeader character={character} />
        <CharacterInfoBox character={character}>
            
        <TalentBlock talents={character.talents} />
        </CharacterInfoBox>
        <AbilityList abilities={character.abilities} />
        </>
    )
}