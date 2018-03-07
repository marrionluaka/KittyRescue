import * as React from "react";
import { 
    View,
    Animated,
    Easing
 } from 'react-native';

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

export default class Panel extends React.Component<IPanel, {}> {
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
            duration: 700
        });
    }

    private animate ({
        animatedProp,
        initialValue,
        toValue,
        duration
    }: IAnimateOptions) {
        animatedProp.setValue(initialValue);

        Animated.timing(
            animatedProp,
          {
            toValue,
            duration,
            easing: Easing.linear
          }
        ).start()
    }

    public render() {
        return (
            <Animated.View style={{
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
