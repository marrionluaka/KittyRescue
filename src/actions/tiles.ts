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

export const flipToBack = (isThereATrap: boolean) => ({
    type: FLIP_TO_BACK,
    isThereATrap
});