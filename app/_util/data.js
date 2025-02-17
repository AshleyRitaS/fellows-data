import fs from 'fs';
import path from 'path'
import {cache} from 'react';

const characterFile = 'data/characters.json'
const dungeonFile = 'data/dungeons.json'

export default (function() {
    var data = {};

    data.getCharacters = cache(async () => {
        var raw = fs.readFileSync(path.join(process.cwd(), characterFile));
        return JSON.parse(raw);
    })

    data.getCharacter = cache(async (id) => {
        const characters = await data.getCharacters();
        return characters.find(e=>{
            return e.id.localeCompare(id, undefined, {sensitivity:'base'}) === 0;
        });
    })

    data.getDungeons = cache(async () => {
        var raw = fs.readFileSync(path.join(process.cwd(), dungeonFile));
        return JSON.parse(raw);
    })

    data.getDungeon = cache(async (id) => {
        const dungeons = await data.getDungeons();
        return dungeons[id];
    })

    return data;
})()