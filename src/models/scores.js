import Realm from 'realm';

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

module.exports = new Realm({ schema: [scoresSchema], schemaVersion: 4 });