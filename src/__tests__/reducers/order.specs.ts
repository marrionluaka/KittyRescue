import * as R from 'ramda';
import orderReducer from '../../reducers/order';

describe("Order Reducer Specs", () => {

    it("returns all tiles given a grid size", () => {
        // Act
        const grid = orderReducer({}, {
             type: "NEW_GAME", 
             gridSize: 8,
             lvl: "easy"
        });

        // Assert
        expect(grid.tiles.length).toBe(7);
        expect(grid.pointer).toBe(0);
    });

    it("adds 'matched' prop when tiles are matched", () => {
        // Arrange
        const state = {
            tiles: [ { src: 'A' } ],
            pointer: 0,
            alreadyMatchedTiles: {}
        };

        const matchedTiles = [ { src: "A" } ];

        // Act
        const order = orderReducer(state, {
             type: "TILES_MATCHED", 
             tiles: matchedTiles
        });

        // Assert
        expect(order.tiles[0].matched).toBeTruthy();
        expect(order.pointer).toBe(1);
        expect(order.alreadyMatchedTiles[matchedTiles[0].src].isMatched).toBeTruthy();
    });
});