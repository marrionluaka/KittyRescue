import scoreReducer from '../../reducers/score';

describe("Score Reducer Specs", () => {

    it("NEW_GAME: sets the score to zero", () => {
        const state = 0;
        const action = {
            type: "NEW_GAME"
        };
        
        const expected = 0;
        const score = scoreReducer(state, action);

        expect(score).toEqual(expected);
    });

    it("ADD_POINTS: increments the score", () => {
        const state = 0;
        const action = {
            type: "ADD_POINTS",
            amount: 10
        };
        
        const expected = 10;
        const score = scoreReducer(state, action);

        expect(score).toEqual(expected);
    });

    describe("FLIP_TO_BACK", () =>{
        it("returns state when there is no trap and score is not greater than zero", () => {
            const state = 0;
            const action = { type: "FLIP_TO_BACK" };
        
            const expected = 0;
            const score = scoreReducer(state, action);

            expect(score).toEqual(expected);
        });

        it("decrements the score by 3 when the current score is greater or equal to zero", () => {
            const state = 10;
            const action = { 
                type: "FLIP_TO_BACK",
                isThereATrap: true
            };
        
            const expected = 7;
            const score = scoreReducer(state, action);

            expect(score).toEqual(expected);
        });

        it("returns zero when the score is less or equal to zero", () => {
            const state = 2;
            const action = { 
                type: "FLIP_TO_BACK",
                isThereATrap: true
            };
        
            const expected = 0;
            const score = scoreReducer(state, action);

            expect(score).toEqual(expected);
        });

    });
});