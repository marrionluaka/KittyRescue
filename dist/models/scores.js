"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Realm = require("realm");
let scoresSchema = {
    name: 'Scores',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        score: 'int',
        gameMode: 'string',
        difficulty: 'string',
        gridSize: 'int'
    }
};
exports.default = new Realm({ schema: [scoresSchema], schemaVersion: 4 });
