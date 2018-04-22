import * as R from 'ramda';
import tilesReducer from '../../reducers/tiles';

describe("Tiles reducer spec", () => {
    let state;

    beforeEach(() => {
        state = {
            tiles: { 
           'cbc82e63-9ac9-442a-2318-e1394fc7828d':
            { src: 'A',
              isFlipped: false,
              id: 'cbc82e63-9ac9-442a-2318-e1394fc7828d' },
           '64d5f906-8e81-7d56-5b55-5879482e8251':
            { src: 'B',
              isFlipped: false,
              id: '64d5f906-8e81-7d56-5b55-5879482e8251' },
           '5b0c12ad-57ec-98e9-b540-4597643e2454':
            { src: 'B',
              isFlipped: false,
              id: '5b0c12ad-57ec-98e9-b540-4597643e2454' },
           '201020ab-b5f6-f9ea-2d30-98e7f01f3d91':
            { src: 'A',
              isFlipped: false,
              id: '201020ab-b5f6-f9ea-2d30-98e7f01f3d91' } }
        };
    });

    it("returns all tiles given a grid size", () => {
        // Act
        const grid = tilesReducer({}, {
             type: "NEW_GAME", 
             gridSize: 8,
             lvl: "easy"
        });

        // Assert
        expect(Object.values(grid.tiles).length).toBe(16);
        expect(grid.tiles_flipped).toBe(0);
    });

    it("adds isMatched property to matched tiles", () => {
        // Arrange
        const tiles = [
            {id: "cbc82e63-9ac9-442a-2318-e1394fc7828d"}, 
            {id: "201020ab-b5f6-f9ea-2d30-98e7f01f3d91"}
        ];

        // Act
        const grid = tilesReducer(state, {
            type: "TILES_MATCHED",
            tiles
        });

        // Assert
        expect(grid.tiles[tiles[0].id].isMatched).toBeTruthy();
        expect(grid.tiles[tiles[1].id].isMatched).toBeTruthy();
    });
});

