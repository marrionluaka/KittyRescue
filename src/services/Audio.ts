import { IAudioService } from "../interfaces";

const Sound = require('react-native-sound');

export default class Audio implements IAudioService {
    private readonly bite: any
    private readonly win: any
    private readonly wrong: any
    private readonly ding: any
    private readonly soundMap: any
    private readonly youLose: any
    private readonly gameOver: any

    constructor(){
        Sound.setCategory('Playback');
        
        this.bite = new Sound('bite.mp3', Sound.MAIN_BUNDLE, this.errorHandler);
        this.win = new Sound('win.mp3', Sound.MAIN_BUNDLE, this.errorHandler);
        this.wrong = new Sound('wrong.mp3', Sound.MAIN_BUNDLE, this.errorHandler);
        this.ding = new Sound('ding.mp3', Sound.MAIN_BUNDLE, this.errorHandler);
        this.youLose = new Sound('you_lose.mp3', Sound.MAIN_BUNDLE, this.errorHandler);
        this.gameOver = new Sound('game_over.mp3', Sound.MAIN_BUNDLE, this.errorHandler);

        this.soundMap = {
            bite: this.bite,
            win: this.win,
            wrong: this.wrong,
            ding: this.ding,
            youLose: this.youLose,
            gameOver: this.gameOver
        };
    }

    private errorHandler = error => {
        if (error) {
            console.log('failed to load the sound', error);
            return;
        }
    }
    
    public playSound = sound => {
        const _sound = this.soundMap[sound];

        if(!_sound) return;

        _sound.play(success => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                _sound.reset();
            }
        });
    }
}