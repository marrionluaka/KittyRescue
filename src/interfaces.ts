export interface IRecord {
    id: number;
    name: string;
    score: number;
    difficulty: string;
    gridSize: number;
}

export interface IAudioService{
    playSound(sound: any): void
}