import * as React from 'react';
 
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions
} from 'react-native';
import { Animator } from '../common/AbstractAnimator';

const styles = StyleSheet.create({
    progress_container: {
      borderWidth: 1,
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
      top: -2
    }
});

export default class Bar extends Animator<{ time: number; }> {
    private progress: Animated.Value
    private initialVal: number
    public state: any
    private initialState: any = { progress: 0 }

    constructor(props) {
      super(props);

      this.state = this.initialState;
    }

    componentWillMount(){
        alert(this.props.time)
        this.progress = new Animated.Value(0);
        this.getProgressStyles = this.getProgressStyles.bind(this);
    }

    componentWillReceiveProps(newProps) {
        
        // will happen only once 
        if(newProps.time > this.props.time) this.initialVal = newProps.time;

        const prevVal = !this.props.time ? 100 : this.getPercentage(this.state.progress,this.initialVal);
        const nextVal = !this.props.time ? 100 : this.getPercentage(newProps.time,this.initialVal);
        
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

    private getPercentage(valA: number, valB: number){
        return Math.floor((valA/valB) * 100);
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
          width: this.getPercentage(this.props.time, this.initialVal) === 100 ? "100%" : animated_width,
          height: 25,
          backgroundColor: animated_color
        }
    }
    
    public render() {
        
        let _style = true ? {
            width: "100%",
            height: 25,
            backgroundColor: "rgb(101, 203, 25)"
        } : this.getProgressStyles();

        return (
            <View style={{ paddingLeft: 2, paddingRight: 2 }}>
              <View style={styles.progress_container}>
                <Animated.View
                  style={[_style]}
                ></Animated.View>
                    <Text style={styles.progress_status}>
                        { this.props.children }
                    </Text>
              </View>
            </View>
        );
    }
   
  }