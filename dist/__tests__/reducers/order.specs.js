"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../reducers/order");
describe("Order Reducer Specs", () => {
    it("returns all tiles given a grid size", () => {
        // Act
        const grid = order_1.default({}, {
            type: "INIT_ORDER",
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
            tiles: [{ src: 'A' }],
            pointer: 0,
            alreadyMatchedTiles: {}
        };
        const matchedTiles = [{ src: "A" }];
        // Act
        const order = order_1.default(state, {
            type: "TILES_MATCHED",
            tiles: matchedTiles
        });
        // Assert
        expect(order.tiles[0].matched).toBeTruthy();
        expect(order.pointer).toBe(1);
        expect(order.alreadyMatchedTiles[matchedTiles[0].src].orderMatched).toBeTruthy();
    });
});
