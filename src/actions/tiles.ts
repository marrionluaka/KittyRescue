import { 
    NEW_GAME, 
    FLIP_TO_BACK, 
    TILES_MATCHED,
    ADD_TO_MEMORY,
    INCREMENT_FLIPS,
    EMPTY_MEMORY
} from "../types";

export const newGame = (gridSize, lvl) => ({
    type: NEW_GAME,
    gridSize,
    lvl
});

export const tilesMatched = tiles => ({
    type: TILES_MATCHED,
    tiles
});

export const flipToBack = memoryTiles => ({
    type: FLIP_TO_BACK,
    memoryTiles
});

export const addToMemory = tile => ({
    type: ADD_TO_MEMORY,
    tile
});

export const incrementFlips = numFlip => ({
    type: INCREMENT_FLIPS,
    numFlip
});

export const emptyMemory = () => ({
    type: EMPTY_MEMORY
});