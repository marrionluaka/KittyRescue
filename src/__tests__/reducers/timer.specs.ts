import timerReducer, { ITimerOptions, IAction } from '../../reducers/timer';
import { 
    timerLvls, 
    MIN_SCORE 
} from "../../globals";

describe("Timer Reducer Specs", () => {
    let state;

    beforeEach(() => {
        state = {
            time: 0,
            hasGameStarted: null,
            invalidateTimer: null
        };
    });

    it("NEW_GAME: initializes the game", () => {
        const action: IAction = {
            type: "NEW_GAME",
            gridSize: 8,
            lvl: "easy"
        };

        const expected = {
            time: 60,
            hasGameStarted: false
        };

        const timer: ITimerOptions = timerReducer(state, action);

        expect(timer).toEqual(expected);
    });

    it("DECREASE_TIME: decreases seconds time by one", () => {
        state.time = 60;
        const action: IAction = { type: "DECREASE_TIME" };

        const expected = 59;
        
        const timer: ITimerOptions = timerReducer(state, action);

        expect(timer.time).toEqual(expected);
    });

    it("INVALIDATE_TIMER: invalidates the timer", () => {
        const action: IAction = { 
            type: "INVALIDATE_TIMER",
            msg: "Game Over"
        };

        const expected = "Game Over";
        
        const timer: ITimerOptions = timerReducer(state, action);

        expect(timer.invalidateTimer).toEqual(expected);
    });

    describe("ADD_POINTS:", () => {

        it("returns untouched state when time equals zero", () => {
            const action: IAction = { type: "ADD_POINTS" };
            
            const timer: ITimerOptions = timerReducer(state, action);
    
            expect(timer).toEqual(state);
        });

        it("returns untouched state when game has not started yet", () => {
            state.time = 10;

            const action: IAction = { type: "ADD_POINTS" };
            
            const timer: ITimerOptions = timerReducer(state, action);
    
            expect(timer.time).toEqual(state.time);
        });

        it("returns untouched state when the amount is greater than the minimum score", () => {
            state.time = 10;
            state.hasGameStarted = true;

            const action: IAction = { 
                type: "ADD_POINTS",
                amount: 9
            };

            const timer: ITimerOptions = timerReducer(state, action);
    
            expect(timer).toEqual(state);
        });

        it("adds 3 more seconds to the timer state", () => {
            state.time = 10;
            state.hasGameStarted = true;

            const action: IAction = { 
                type: "ADD_POINTS",
                amount: 15
            };
    
            const expected = 13;
            
            const timer: ITimerOptions = timerReducer(state, action);
    
            expect(timer.time).toEqual(expected);
        });
    });

    describe("FLIP_TO_BACK:", () => {

        it("returns the state", () => { 
            state.hasGameStarted = true;
            const action: IAction = { type: "FLIP_TO_BACK" };

            const timer: ITimerOptions = timerReducer(state, action);

            expect(timer).toEqual(state);
        });

        it("starts the game only if the game has not started yet", () => { 
            const action: IAction = { type: "FLIP_TO_BACK" };

            const timer: ITimerOptions = timerReducer(state, action);

            expect(timer.hasGameStarted).toBeTruthy();
        });

        it("decreases the time by 3 whenever a user finds a trap", () => { 
            state.time = 10;
            state.hasGameStarted = true;
            
            const action: IAction = { 
                type: "FLIP_TO_BACK",
                isThereATrap: true
            };

            const expected = 7;

            const timer: ITimerOptions = timerReducer(state, action);

            expect(timer.time).toEqual(expected);
        });
    });
});