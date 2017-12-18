import 'react-native';
import React from 'react';
import R from 'ramda';

import tiles from '../Gameboard/reducers/tiles';

describe("Tiles reducer spec", () => {
    it("returns all tiles given a grid size", () => {
        const grid = tiles([], {
             type: "FETCH_TILES", 
             gridSize: "4x4"
            });
    
        expect(grid.length).toBe(16);
    });

    it("returns the state when the type is undefined or not equal to FETCH_TILES", () => {
        const grid = tiles([], {});
   
        expect(grid.length).toBe(0);
    });

    it("updates tiles array when a match is found", () =>{ 
        const grid = tiles([
            { src: 1},
            { src: 3},
            { src: 1},
            { src: 2}
        ], {
            type: "TILES_MATCHED",
            src: 1
        });

        const matchedTiles = grid.filter(tile => tile.src === 1);

        expect(matchedTiles.length).toBe(2);
        expect(matchedTiles[0].isMatched).toBeTruthy();
        expect(matchedTiles[1].isMatched).toBeTruthy();
    });

    it("flips tiles back when a match is not found", () => {
        const arr = [
            { id: 1 },
            { id: 4 },
            { id: 3 },
            { id: 2 }
        ];

        const getTileIdx = idx => R.compose(
            R.findIndex,
            R.propEq
        )('id', idx)(arr);

        const memoryTiles = [
            { id: 1 },
            { id: 2 }
        ];

        const grid = tiles(arr, {
            type: "FLIP_TO_BACK",
            memoryTiles
        });
        
        const fTile = getTileIdx(1);
        const sTile = getTileIdx(2);

        expect(grid[fTile]).toHaveProperty('isFlipped');
        expect(grid[sTile]).toHaveProperty('isFlipped');

        expect(grid[fTile].isFlipped).toBe(false);
        expect(grid[sTile].isFlipped).toBe(false);
    });

    it("shuffles tiles", () => { });
});

