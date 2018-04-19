import * as React from 'react';
 
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions
} from 'react-native';
import { Animator } from '../common/AbstractAnimator';
import { getPercentage } from '../../lib'

const styles = StyleSheet.create({
    progress_container: {
     
      borderColor: '#333',
      backgroundColor: '#ccc',
      position: 'relative'
    },
    progress_status: {
      color: '#333',
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
      position: 'absolute',
      top: -4
    }
});

export default class Bar extends Animator<{ time: number; }> {
    private progress: Animated.Value
    private initialVal: number
    public state: any
    private initialState: any = { progress: null }

    constructor(props) {
      super(props);
      this.state = this.initialState;
    }

    componentWillMount(){
        this.progress = new Animated.Value(0);
        this.getProgressStyles = this.getProgressStyles.bind(this);
    }

    componentWillReceiveProps(newProps) {
        // will happen only once 
        if(this.state.progress === null) this.initialVal = newProps.time;

        const prevVal = this.state.progress === null 
        ? 100 
        : getPercentage(this.state.progress, this.initialVal);

        const nextVal = this.state.progress === null 
        ? 100 
        : getPercentage(newProps.time, this.initialVal);
        
        this.animate({
            animatedProp: this.progress,
            initialValue: prevVal,
            toValue: nextVal,
            duration: 1000
        });

        this.setState({ progress: newProps.time });
    }

    componentWillUnmount(){
        this.setState(this.initialState);
    }

    private getProgressStyles() {
        const { width } = Dimensions.get('window');
        const available_width = width - 2 - 4;

        const animated_width = this.progress.interpolate({
          inputRange: [0, 50, 100],
          outputRange: [ 0, available_width / 2, available_width]
        });
        
        const animated_color = this.progress.interpolate({
          inputRange: [0, 50, 100],
          outputRange: ['rgb(199, 45, 50)', 'rgb(224, 150, 39)', 'rgb(101, 203, 25)']
        });
        
        return {
            height: 20,
            width: animated_width,
            backgroundColor: animated_color
        }
    }
    
    public render() {
        const _style = this.state.progress === this.initialVal ? {
            height: 20,
            width: "100%",
            backgroundColor: 'rgb(101, 203, 25)'
        } : this.getProgressStyles();

        return (
            <View style={{ paddingLeft: 2, paddingRight: 2 }}>
              <View style={styles.progress_container}>
                <Animated.View style={_style} />
                <Text style={styles.progress_status}>
                    { this.props.children }
                </Text>
              </View>
            </View>
        );
    }
   
  }