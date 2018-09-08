"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scores_1 = require("../models/scores");
const lib_1 = require("../lib");
class ScoreQueries {
    constructor(gameMode, difficulty, gridSize) {
        this._threshold = 5;
        this.isNewHighScore = () => this.scores.length < this._threshold;
        this.isLowestScore = score => this.lowestScore < score;
        this.insertScore = (name, score) => {
            scores_1.default.write(() => {
                scores_1.default.create('Scores', {
                    id: lib_1.guid(),
                    name,
                    score,
                    gameMode: this.gameMode,
                    difficulty: this.difficulty,
                    gridSize: this.gridSize
                });
            });
        };
        this.updateScore = (name, score) => {
            scores_1.default.write(() => {
                let record = this.scores.find(x => x.score === this.lowestScore);
                record.name = name;
                record.score = score;
            });
        };
        // realm.write(() => {
        //     realm.deleteAll();
        // });
        this.gridSize = gridSize;
        this.gameMode = gameMode;
        this.difficulty = difficulty;
        this.scores = scores_1.default
            .objects('Scores')
            .filtered(`gameMode = "${gameMode}" AND difficulty = "${difficulty}" AND gridSize = "${gridSize}"`);
        this.lowestScore = Math.min.apply(Math, this.scores.map(x => x.score));
    }
}
ScoreQueries.fetchScore = (gameMode) => {
    return scores_1.default
        .objects('Scores')
        .filtered(`gameMode = "${gameMode}"`)
        .sorted('score', true);
};
exports.default = ScoreQueries;
