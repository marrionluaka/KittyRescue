import R from 'ramda';

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
        value,
        firstAcc,
        secondAcc,
        frequency,
        onComplete = () => {}
    } = options,
    _pred = !!reducer && !!secondAcc ? reducer(firstAcc, secondAcc) : firstAcc; 

    let _intervalId = null,
        _counter    = 0;
    
    function _update(){
        if(_counter < _pred) {
            _counter++;
            fn(value, _counter);
        } else {
            onComplete();
            clearInterval(_intervalId);
        }
    }
    
    _intervalId = setInterval(_update, frequency || 10);
}

/**
 
    import { 
    animateCounter,
    formatTime 
} from './lib';

const MAX_LIVES = 25;

var lifeComponent = (function(){
    var _lives,
        _time,
		_timeThreshold = 300,
		_decreaseLife,
		_increaseLife;
	
	function _lifeComponent(lives, decreaseLife, increaseLife){
		// gets amount of lives from redux
		_lives = lives;	
		_decreaseLife = decreaseLife;
		_increaseLife = increaseLife;
	}

	_lifeComponent.prototype = (function(){
		return {
            state: {
                time: null,
                lives: this.props.lives,
                hasTimerStarted: false
            },

			componentWillMount(){
				//if(isNewGame) _decreaseLife();
				
				if(!hasTimerStarted && this.state.lives < MAX_LIVES) _startTimer();				
            },
            
            render(){
                return (
                    <View>
                        <Text>{this.state.time}</Text>
                        <Heart 
                            live={this.state.live}
                        />
                    </View>
                );
            }
		};

		function _startTimer(){
            this.setState({ hasTimerStarted: true });
            
            animateCounter({
                fn: (val, counter) => this.setState({ time: formatTime(val - counter) }),
                onComplete: () => {
                    this.props.increaseLife();
                    this.setState({ hasTimerStarted: false });
                },
                value: _timeThreshold,
                firstAcc: _timeThreshold,
                frequency: 1000
            });
		}

	}());
	
	return _lifeComponent;
}());
 
*/