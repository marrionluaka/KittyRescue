import * as R from 'ramda';

const levels = {
    "easy": 1,
    "medium": 2,
    "hard": 3
};

export const guid = () => 
    `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;

const s4 = () => 
    Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);


export const duplicateEl = R.curry((idGen, arr) => {
   return arr.reduce((acc, val) => 
    [
        ...acc,
        Object.assign({}, val, { id: idGen() }),
        Object.assign({}, val, { id: idGen() })
    ], []);
});

export const addTrapBasedOnLevelChosen =  lvl => arr => {
    const chosenLvl = levels[lvl];
    let array = new Array(chosenLvl);
    
    let traps = chosenLvl > 1 ? 
        array.fill({ src: "TRAP", isFlipped: false, isTrap: true }) :
        !!chosenLvl ?
        [ { src: "TRAP", isFlipped: false, isTrap: true } ] : [];

    return arr.concat(traps);
};

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

export const update = (index, newValue, arr) => 
     R.update(
        index, 
        Object.assign({}, arr[index], newValue)
    )(arr);


export const prepareGridData = (lvl, gridSize, arr) => 
    arr
        .slice( 0, gridSize - (levels[lvl] || 0) )
        .reduce((acc, el) => {
            return [
                ...acc,
                { src: el, isFlipped: false  }
            ];
        }, []);


export const formatTime = timeInSeconds => {
    const _m = Math.floor( timeInSeconds / 60 ),
          _s = timeInSeconds % 60;

    return !_s ? `${_m}:00` : `${_m}:${_s < 10 ? "0"+ _s : _s}`;
};

export const animateCounter = options => {
    const { 
        fn,
        reducer,
        counter,
        firstAcc,
        secondAcc,
        frequency,
        reset = () => {},
        onComplete = () => {}
    } = options,
    _pred = !!reducer && !!secondAcc ? reducer(firstAcc, secondAcc) : firstAcc; 

    let _intervalId = null,
        _counter    = 0;
    
    function _update(){
        if(_counter < _pred) {
            _counter++;
            fn(counter, _counter);
        } else {
            onComplete();
            reset(_counter) ? _counter = 0 : clearInterval(_intervalId);
        }
    }
    
    _intervalId = setInterval(_update, frequency || 10);
}