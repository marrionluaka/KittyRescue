import * as React from "react";
import { 
    Animated,
    Easing
 } from 'react-native';

 interface IAnimateOptions{
    animatedProp: Animated.Value;
    initialValue: number; 
    toValue: number;
    duration: number;
    easing?: string;
}

 abstract class Animator<T> extends React.Component<T>{

    protected animate ({
        animatedProp,
        initialValue,
        toValue,
        duration,
        easing = 'linear'
    }: IAnimateOptions) {
        animatedProp.setValue(initialValue);

        Animated.timing(
            animatedProp,
          {
            toValue,
            duration,
            easing: Easing[easing]
          }
        ).start()
    }
 }

 export { Animator }