import * as React from "react";
import { 
    Text,
    Animated,
    Easing,
    View
 } from "react-native";

 import { Animator } from '../common/AbstractAnimator';

class ProgressBar extends Animator<{ progress: number; }> {
    private _widthAnimated: Animated.Value

    constructor(props){
        super(props);

        this._widthAnimated = new Animated.Value(0);
    }

    componentDidMount () {
        this.animate({
            animatedProp: this._widthAnimated,
            initialValue: 0,
            toValue: this.props.progress,
            duration: 400
        });
    }

    render(){
        return (
            <View
                style={{
                    width: '100%',
                    backgroundColor: '#ddd'
                }}
            >
                <Animated.View
                    style={{
                        width: this._widthAnimated,
                        height: 5,
                        backgroundColor: '#4CAF50'
                    }}
                />
            </View>
        );
    }
}

export { ProgressBar };