import realm from '../models/scores';
import { guid } from '../lib';

const threshold = 5;

export default class ScoreQueries {
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

    isNewHighScore = () => this.scores.length < threshold;
    
    isLowestScore = score => this.lowestScore < score;

    insertScore = (name, score) => {
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

    updateScore = (name, score) => {
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