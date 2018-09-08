"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sound = require('react-native-sound');
class Audio {
    constructor() {
        this.errorHandler = error => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
        };
        this.playSound = sound => {
            const _sound = this.soundMap[sound];
            if (!_sound)
                return;
            _sound.play(success => {
                if (success) {
                    console.log('successfully finished playing');
                }
                else {
                    console.log('playback failed due to audio decoding errors');
                    _sound.reset();
                }
            });
        };
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
}
exports.default = Audio;
