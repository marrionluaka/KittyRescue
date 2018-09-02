import * as React from 'react';
import {
    View,
    Text,
    Animated,
    UIManager,
    Dimensions,
    StyleSheet,
    PanResponder,
    LayoutAnimation,
    PanResponderInstance
} from 'react-native';

const styles = StyleSheet.create({
    cardStack: {
        position: 'absolute',
        width: "100%"
    }
});

class Deck extends React.Component<{
    data: any
    renderCard: any
    onSwipeLeft?: any
    onSwipeRight?: any
    renderNoMoreCard?: any
}>{
    static defaultProps = {
        onSwipeLeft: () => {},
        onSwipeRight: () => {},
        renderNoMoreCard: () => <Text>No more Cards</Text>
    }

    private readonly _panResponder: PanResponderInstance;
    private readonly _position: Animated.ValueXY;
    private readonly _SCREEN_WIDTH: any = Dimensions.get("window").width;
    private readonly _SWIPE_THRESHOLD: any = .25 * this._SCREEN_WIDTH;
    private readonly _SWIPE_OUT_DURATION: any = 250;

    constructor(props){
        super(props);

        this._position = new Animated.ValueXY();
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, { dx, dy }) => {
                this._position.setValue({ x: dx, y: 0 });    
            },
            onPanResponderRelease: (e, { dx, dy }) => {
                switch(true){
                    case dx > this._SWIPE_THRESHOLD:
                        this.forceSwipe('right');
                        break;
                    case dx < -this._SWIPE_THRESHOLD:
                        this.forceSwipe('left');
                        break;
                    default:
                        this.resetPosition();
                }
            }
        });
    }

    state = { index: 0}

    componentWillMount(){
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction: string){
        Animated.timing(this._position, {
            toValue: { x: direction === 'right' ? this._SCREEN_WIDTH : -this._SCREEN_WIDTH, y: 0 },
            duration: this._SWIPE_OUT_DURATION
        }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction: string){
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this._position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
    }

    resetPosition(){
        Animated.spring(this._position, {
            toValue: {x: 0, y: 0}
        }).start();
    }

    renderCards(){
        if(this.state.index >= this.props.data.length) 
            return this.props.renderNoMoreCard();

        return this.props.data.map((item, idx) => {
            if(idx < this.state.index) return null;  
            
            if(idx === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardStack, { zIndex: idx * -1 }]}
                        {...this._panResponder.panHandlers}
                    >
                        { this.props.renderCard(item) }
                    </Animated.View>
                );
            }

            return (
                <Animated.View key={item.id} style={[styles.cardStack, { zIndex: idx * -1, top: 10 * (idx - this.state.index) }]}>
                    { this.props.renderCard(item) }
                </Animated.View>
            );
        }).reverse();
    }

    getCardStyle(){
        const { _position, _SCREEN_WIDTH } = this;

        const translateY = _position.x.interpolate({
            inputRange: [-_SCREEN_WIDTH * 1.5, 0, _SCREEN_WIDTH * 1.5],
            outputRange: [-30, 0, 30],
            extrapolate: 'clamp'
        });
        
        return{
            ...this._position.getLayout(),
            transform: [{ translateY }]
        };
    }

    render(){
        return (
            <View>
                {
                    this.renderCards()
                }
            </View>
        );
    }
}

export { Deck };