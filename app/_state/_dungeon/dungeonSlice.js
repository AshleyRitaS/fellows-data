import { createSlice } from "@reduxjs/toolkit";

import LZString from 'lz-string'

//Putting this here b/c I'm too stubborn to use TypeScript
//
// pull : [enemy1, enemy2]
// enemy : standard enemy object from the rest of code

const initialState = {
    dungeon:{},
    currentMapID:'',
    currentPullID:0,
    pulls:[[]],
    selectedEnemyID:'',
    initialized:false,
}

function removeFromPullsExcept(pulls, id, exemptedPull = -1) {
    pulls.forEach((element, i) => {
        if (i === exemptedPull) {
            return;
        }
        var index = element.indexOf(id);
        if (index >= 0) {
            element.splice(index, 1)
        }
    });
}

function getAllEnemiesInGroup(components, groupID) {
    return components.filter(e => {
        if (e.group === groupID) {
            console.log(e.id, e.group, groupID)
        }
        return e.group === groupID
});
}

export const dungeonSlice = createSlice({
    name:'dungeon',
    initialState,
    reducers: {
        initialize: (state, action) => {
            console.log(action.payload)
            state.dungeon = action.payload;
            state.currentMapID = Object.keys(state.dungeon?.maps || {})?.[0]
            state.selectedEnemyID = state.dungeon?.maps?.[state.currentMapID]?.components?.[0]?.id
        },
        newEnemy: (state, action) => {
            if (state.selectedEnemyID !== action.payload) {
                state.selectedEnemyID = action.payload;
            }
        },
        pullEnemy: (state, action) => {
            var components = state.dungeon.maps[state.currentMapID].components;
            var enemy = components.find(e => e.id === action.payload);
            var componentsToPull = getAllEnemiesInGroup(components, enemy.group);
            componentsToPull.forEach((e)=>{
                console.log(e.id)
            })
            if (state.pulls?.[state.currentPullID].includes(action.payload)) {
                componentsToPull.forEach(e => {
                    removeFromPullsExcept(state.pulls, e.id);
                })
            } else {
                componentsToPull.forEach(e => {
                    removeFromPullsExcept(state.pulls, e.id, state.currentPullID)
                    if (!state.pulls?.[state.currentPullID]?.includes(e.id)) {
                        state.pulls?.[state.currentPullID]?.push(e.id);
                    }
                })
            }
            state.pulls = state.pulls.slice();
        },
        pullEnemySingle: (state, action) => {
            if (state.pulls?.[state.currentPullID].includes(action.payload)) {
                removeFromPullsExcept(state.pulls, action.payload);
            } else {
                removeFromPullsExcept(state.pulls, action.payload, state.currentPullID)
                state.pulls?.[state.currentPullID]?.push(action.payload);
            }
            state.pulls = state.pulls.slice();
        },
        newPull: (state) => {
            state.currentPullID = state.pulls.length;
            state.pulls.push([])
        },
        changePull: (state, action) => {
            state.currentPullID = action.payload;
        },
        deletePull: (state, action) => {
            state.pulls.splice(action.payload, 1);
            state.pulls = state.pulls.slice();
            if (state.pulls.length <= 0) {
                state.pulls.push([]);
            }
            state.currentPullID = state.pulls.length - 1;
        },
        setMap: (state, action) => {
            if (state.currentMapID !== action.payload) {
                state.currentMapID = action.payload;
                state.selectedEnemyID = state.dungeon?.maps?.[state.currentMapID]?.components?.[0]?.id
            }
        },
        importPulls: (state, action) => {
            var prefix = action.payload.substring(0,2);
            var payload = action.payload.substring(2);
            if (prefix === state.dungeon.prefix) {
                var shortPulls = JSON.parse(LZString.decompressFromEncodedURIComponent(payload));
                var pulls = [];
                if (pulls) {
                    try {
                        shortPulls.forEach((e) => {
                            pulls.push(e.map(id=> {
                                return prefix + id;
                            }))
                        })
                        state.pulls = pulls;
                    } catch {
                        console.log('importError');
                    }
                }
            }
        }
    }
})

export const { importPulls, initialize, newEnemy, pullEnemy, pullEnemySingle, newPull, changePull, deletePull, setMap} = dungeonSlice.actions;

var selectMapFunctions = {};
export const createSelectMapByID = (id) => {
    if (!selectMapFunctions[id]) {
        selectMapFunctions[id] = function (state) {
            return state.dungeon.dungeon?.maps?.[id];
        }
    }
    return selectMapFunctions[id];
}

export const selectCurrentMap = (state) => {
    return createSelectMapByID(selectCurrentMapID(state))(state);
}

export const selectCurrentMapID = (state) => {
    return state.dungeon.currentMapID;
}

var selectEnemyFunctions = {};
export const createSelectEnemyByID = (id) => {
    if (!selectEnemyFunctions[id]) {
        selectEnemyFunctions[id] = function (state) {
            return selectCurrentMap(state)?.components?.find((e) => e.id === id);
        }
    }
    return selectEnemyFunctions[id];
}

var selectEnemyAllMapsFunctions = {} 
export const createSelectEnemyByIDAllMaps = (id) => {
    if (!selectEnemyAllMapsFunctions[id]) {
        selectEnemyAllMapsFunctions[id] = function (state) {
            var maps = selectAllMapIDs(state);
            var enemy;
            maps.forEach((mapID) => {
                if (enemy) {
                    return;
                }
                var map = createSelectMapByID(mapID)(state);
                var found = map.components.find((e)=> {
                    return e.id === id;
                })
                if (found) {
                    enemy = found;
                }
            })
            return enemy;
        }
    }
    return selectEnemyAllMapsFunctions[id];
}

export const selectCurrentEnemyID = (state) => {
    return state.dungeon.selectedEnemyID;
}

export const selectCurrentEnemy = (state) => {
    return createSelectEnemyByIDAllMaps(selectCurrentEnemyID(state))(state);
};

export const selectAllMapIDs = (state) => {
    return Object.keys(state.dungeon.dungeon.maps || {});
}

var lastPullIDs = [];
export const selectAllPullIDs = (state) => {
    return Object.keys(state.dungeon.pulls);
}

var selectPullFunctions = {};
export const createSelectPull = function(id) {
    if (!selectPullFunctions[id]) {
        selectPullFunctions[id] = function(state) {
            return state.dungeon.pulls[id]
        }
    }
    return selectPullFunctions[id];
}

export const selectCurrentPull = function(state) {
    return createSelectPull(state.dungeon.currentPullID)(state);
}

export const selectCurrentPullID = function(state) {
    return state.dungeon.currentPullID;
}

var selectPullByEnemyIDFunctions = {}
export const createSelectPullByEnemyID = function(id) {
    if (!selectPullByEnemyIDFunctions[id]) {
        selectPullByEnemyIDFunctions[id] = function(state) {
            return state.dungeon.pulls.findIndex((pull)=> {
                return pull.some((enemy) => {
                    return enemy === id
                })
            })
        }
    }
    return selectPullByEnemyIDFunctions[id];
}

var selectPullInfoFunctions = {};
export const createSelectPullInfo = function(id, allMaps = true) {
    if (!selectPullInfoFunctions[id]) {
        selectPullInfoFunctions[id] = [];
    }
    if (!selectPullInfoFunctions[id][allMaps ? 1 : 0]) {
        var prev = {};
        selectPullInfoFunctions[id][allMaps ? 1 : 0] = function(state) {
            var pull = state.dungeon.pulls[id];
            var output = {score:0}
            output.locations = []
            output.score = pull.reduce((acc, cur)=> {
                if (allMaps) {
                    var enemy = createSelectEnemyByIDAllMaps(cur)(state);
                } else {
                    var enemy = createSelectEnemyByID(cur)(state);
                }
                if (enemy) {
                    output.locations.push(enemy.location);
                    return acc + (enemy.score || 0);
                } else {
                    return acc;
                }
            }, 0)
            if (!deepCompare(prev, output)) {
                prev = output;
            }
            return prev;
        }
    }
    return selectPullInfoFunctions[id][allMaps ? 1 : 0];
}


export const selectSaveStateExport = function(state) {
    var pulls = state.dungeon.pulls;
    var compressedPulls = [];
    pulls.forEach((e)=> {
        compressedPulls.push(e.map((id) => {
            var tmp = id.split('');
            tmp.splice(0, 2)
            return tmp.join('')
        }))
    })
    var jsonString = JSON.stringify(compressedPulls);
    var exportString = LZString.compressToEncodedURIComponent(jsonString);
    return state.dungeon.dungeon.prefix + exportString;
}

var allPullInfo = [];
export const selectAllPullInfo = function(state) {
    var pullIDs = selectAllPullIDs(state);
    var pullInfo = [];
    pullIDs.forEach((value) => {
        pullInfo[value] = createSelectPullInfo(value)(state);
    })
    if (!deepCompare(pullInfo, allPullInfo)) {
        allPullInfo = pullInfo;
    }
    return allPullInfo;
}

var allPullInfoCurrentMap = [];
export const selectAllPullInfoCurrentMap = function(state) {
    var pullIDs = selectAllPullIDs(state);
    var pullInfo = [];
    pullIDs.forEach((value) => {
        pullInfo[value] = createSelectPullInfo(value, false)(state);
    })
    if (!deepCompare(pullInfo, allPullInfoCurrentMap)) {
        allPullInfoCurrentMap = pullInfo;
    }
    return allPullInfoCurrentMap;
}

var routeInfo = {};
export const selectRouteInfo = function(state) {
    var pulls = selectAllPullIDs(state);
    var totalScore = pulls.reduce((acc, cur) => {
        return acc + createSelectPullInfo(cur)(state).score;
    }, 0)
    var output = {score:totalScore, pullCount:pulls.length}
    if (!shallowCompare(routeInfo, output)) {
        routeInfo = output;
    }
    return routeInfo;
}

function shallowCompare(obj1, obj2) {
    return Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key => 
      obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
    );
}


const isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

function deepCompare(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) {
        return (obj1 === obj2);
    }
    return (Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key => 
      obj2.hasOwnProperty(key) && deepCompare(obj1[key], obj2[key])
    ));
}

var dungeonInfo = {
    "name": '',
    "id": '',
    "loadingScreen": '',
    "timer": 0,
    "score": 0,
    "type": '', //'Dungeon' or 'Adventure'
}
export const selectDungeonInfo = function(state) {
    var info = {
        "name": state.dungeon.dungeon.name,
        "id": state.dungeon.dungeon.id,
        "loadingScreen": state.dungeon.dungeon.loadingScreen,
        "timer": state.dungeon.dungeon.timer,
        "score": state.dungeon.dungeon.score,
        "type": state.dungeon.dungeon.type, //'Dungeon' or 'Adventure'
    }
    if (info.name === dungeonInfo.name && info.id === dungeonInfo.id && info.loadingScreen === dungeonInfo.loadingScreen &&
        info.timer === dungeonInfo.timer && info.score === dungeonInfo.score && dungeonInfo.type === info.type) {
        return dungeonInfo;
    } else {
        dungeonInfo = info;
        return dungeonInfo;
    }
}

export default dungeonSlice.reducer;