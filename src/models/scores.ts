import * as Realm from 'realm';

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

export default new Realm({ schema: [scoresSchema], schemaVersion: 4 });