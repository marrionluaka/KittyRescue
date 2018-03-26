import * as React from "react";
import { 
    Text,
    Animated,
    View
 } from "react-native";

 import { Animator } from '../common/AbstractAnimator';


 interface Props{
     color?: string;
     progress: number; 
     seed: () => number;
     update?: () => boolean;
 }

class ProgressBar extends Animator<Props> {
    private _widthAnimated: Animated.Value

    constructor(props){
        super(props);

        this._widthAnimated = new Animated.Value(this.props.progress);
    }

    componentDidMount () {
        this.animate({
            animatedProp: this._widthAnimated,
            initialValue: this.props.progress,
            toValue: 100,
            duration: 500
        });
    }

    componentDidUpdate(){
        this.animate({
            animatedProp: this._widthAnimated,
            initialValue: this.props.seed(),
            toValue: 100,
            duration: 500
        });
    }

    render(){
        /** .interpolate() function helps us transpile our animation values into real style values */
        const width = this._widthAnimated.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', `${this.props.progress}%`]
        });

        return (
            <View
                style={{
                    width: '100%',
                    backgroundColor: '#ddd'
                }}
            >
                <Animated.View
                    style={{
                        width,
                        height: 5,
                        backgroundColor: this.props.color || "#03A9F4"
                    }}
                />
            </View>
        );
    }
}

export { ProgressBar };