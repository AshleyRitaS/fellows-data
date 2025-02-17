import { configureStore } from "@reduxjs/toolkit";
import dungeonReducer from './_dungeon/dungeonSlice'

export default function () {
    return configureStore({
        reducer: {
            dungeon: dungeonReducer
        }
    })
} 