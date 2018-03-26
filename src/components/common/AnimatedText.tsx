import * as React from 'react';
import {
    View,
    Animated,
    Easing,
    Text
} from 'react-native';
import { Animator } from './AbstractAnimator';

class AnimatedText extends Animator<{ styles: any;}>{
    private springValue: Animated.Value

    constructor(props){
        super(props);

        this.springValue = new Animated.Value(0);
    }

    componentDidMount(){
        this.animate({
            animatedProp: this.springValue,
            initialValue: 0,
            toValue: 20,
            duration: 300
        });
    }

    render(){
        return (
            <Animated.Text style={[{ height: this.springValue }, this.props.styles]}>
                {this.props.children}
            </Animated.Text>
        );
    }
}

export { AnimatedText };