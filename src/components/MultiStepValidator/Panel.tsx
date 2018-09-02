import * as React from "react";
import { 
    View,
    Animated,
    Easing
 } from 'react-native';

 import { Animator } from '../common/AbstractAnimator'

interface IPanel {
    name: string;
    propKey: string;
    render: any;
    showNext?: any;
    onComplete?: any;
    push?: any;
    skipTo?: any;
}

interface IAnimateOptions{
    animatedProp: Animated.Value;
    initialValue: number; 
    toValue: number;
    duration: number;
}

export default class Panel extends Animator<IPanel> {
    private _offSetRightAnimated: Animated.Value
    private _opacityAnimated: Animated.Value

    constructor(props){
        super(props);

        this._offSetRightAnimated = new Animated.Value(0);
        this._opacityAnimated     = new Animated.Value(0);
    }

    componentDidMount () {
        this.animate({
            animatedProp: this._offSetRightAnimated,
            initialValue: -100,
            toValue: 0,
            duration: 400
        });
        this.animate({
            animatedProp: this._opacityAnimated,
            initialValue: 0,
            toValue: 1,
            duration: 500
        });
    }

    public render() {
        return (
            <Animated.View style={{
                flex: 1,
                right: this._offSetRightAnimated,
                opacity: this._opacityAnimated 
            }}>
                {this.props.render( 
                    this.props.push,
                    this.props.showNext,
                    this.props.onComplete,
                    this.props.skipTo
                )}
            </Animated.View>
        );
    }
}
