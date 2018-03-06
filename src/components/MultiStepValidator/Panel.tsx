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

export default class Panel extends React.Component<IPanel, {}> {
    private animatedValue: Animated.Value

    constructor(props){
        super(props);

        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount () {
        this.animate();
    }

    animate () {
        this.animatedValue.setValue(-100);

        Animated.timing(
          this.animatedValue,
          {
            toValue: 0,
            duration: 400,
            easing: Easing.linear
          }
        ).start()
    }

    render() {
        return (
            <Animated.View style={{ right: this.animatedValue }}>
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
