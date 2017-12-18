import R from 'ramda';

export const guid = () => 
    `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;

const s4 = () => 
    Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);


export const duplicateEl = idGen => arr => 
    arr.reduce((acc, val) => 
    [
        ...acc,
        Object.assign({}, val, { id: idGen() }),
        Object.assign({}, val, { id: idGen() })
    ], []);

export const addTrapBasedOnLevelChosen = (function(){
    const levels = {
        "easy": 1,
        "medium": 2,
        "hard": 3
    };

    return lvl => arr => {

        const traps = levels[lvl] > 1 ? 
            [...Array(levels[lvl]).keys()]
                .reduce((acc, val) => 
                    [
                        ...acc, 
                        { src: "TRAP", isFlipped: false, isTrap: true }
                    ]
                , []) 
            : [ { src: "TRAP", isFlipped: false, isTrap: true } ];
    
        return [
            ...arr,
            ...traps
        ];
    };
}());


export const shuffle = arr => {
    let m = arr.length, t, i;

    while(m){
        i = Math.floor(Math.random() * m--);

        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }

    return arr;
};

export const update = (index, newValue, arr) => {
    return R.update(
        index, 
        Object.assign({}, arr[index], newValue)
    )(arr)
};