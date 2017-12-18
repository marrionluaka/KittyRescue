import { 
    FETCH_TILES, 
    FLIP_TO_BACK, 
    TILES_MATCHED 
} from "../types";

export const fetchTiles = (gridSize, lvl) => ({
    type: FETCH_TILES,
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