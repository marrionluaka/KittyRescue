import { 
    ADD_POINTS, 
    NEW_GAME, 
    FLIP_TO_BACK 
} from "../types";

export default (score=0, action) => {
    if(action.type === NEW_GAME)
        return 0;

    if(action.type === ADD_POINTS)
        return score += action.amount;
    
    if(action.type === FLIP_TO_BACK){
        if(action.isThereATrap && score > 0)
            return score - 3 >= 0 ? score -=3 : 0;
    }

    return score;
}