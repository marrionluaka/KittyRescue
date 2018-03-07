import * as React from 'react';
import {
    View,
    Animated,
    Easing,
    Text
} from 'react-native';

export default class AnimatedText extends React.Component<{},{}>{
    private springValue: Animated.Value

    constructor(props){
        super(props);

        this.springValue = new Animated.Value(0.3);
    }

    componentDidMount(){
        this.spring();
    }

    spring () {
        this.springValue.setValue(0.3);

        Animated.spring(
          this.springValue,
          {
            toValue: 1,
            friction: 1
          }
        ).start()
    }

    render(){
        return (
            <Animated.Text style={{}}>
                {this.props.children}
            </Animated.Text>
        );
    }
}