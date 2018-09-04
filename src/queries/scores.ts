import realm from '../models/scores';
import { guid } from '../lib';

export default class ScoreQueries {
    private readonly _threshold: number = 5;
    private scores
    private lowestScore
    private gridSize: number
    private gameMode: string
    private difficulty: string

    constructor(gameMode: string, difficulty: string, gridSize: number) {
        // realm.write(() => {
        //     realm.deleteAll();
        // });
        this.gridSize = gridSize;
        this.gameMode = gameMode;
        this.difficulty = difficulty;

        this.scores = realm
            .objects('Scores')
            .filtered(`gameMode = "${gameMode}" AND difficulty = "${difficulty}" AND gridSize = "${gridSize}"`);
        this.lowestScore = Math.min.apply(Math, this.scores.map( x => x.score ));
    }

    public isNewHighScore = () => this.scores.length < this._threshold;
    
    public isLowestScore = score => this.lowestScore < score;

    public insertScore = (name, score) => {
        realm.write(() => {
            realm.create('Scores', {
                id: guid(),
                name, 
                score,
                gameMode: this.gameMode,
                difficulty: this.difficulty,
                gridSize: this.gridSize
            });
        });
    }

    public updateScore = (name, score) => {
        realm.write(() => {
            let record = this.scores.find( x => x.score === this.lowestScore );
            
            record.name = name;
            record.score = score;
        });
    }

    static fetchScore = (gameMode) => {
        return realm
                .objects('Scores')
                .filtered(`gameMode = "${gameMode}"`)
                .sorted('score', true);
    }
}