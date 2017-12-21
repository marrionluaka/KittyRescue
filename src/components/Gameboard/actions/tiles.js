import { 
    NEW_GAME, 
    FLIP_TO_BACK, 
    TILES_MATCHED 
} from "../types";

export const newGame = (gridSize, lvl) => ({
    type: NEW_GAME,
    gridSize,
    lvl
});

export const tilesMatched = src => ({
    type: TILES_MATCHED,
    src
});

export const flipToBack = memoryTiles => ({
    type: FLIP_TO_BACK,
    memoryTiles
});