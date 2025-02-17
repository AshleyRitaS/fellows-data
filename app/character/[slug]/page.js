import CharacterHeader from '../_components/CharacterHeader';
import AbilityList from '../_components/AbilityList';
import data from '@/app/_util/data';
import CharacterInfoBox from '../_components/CharacterInfoBox';
import TalentBlock from '../_components/TalentBlock';

export default async function Character({params}) {
    const {slug} = await params;
    const character = await data.getCharacter(slug)
    return (
        <>
        <CharacterHeader character={character} />
        <CharacterInfoBox character={character} />
        <AbilityList abilities={character.abilities} />
        <TalentBlock talents={character.talents} />
        </>
    )
}