import * as React from "react";

import { 
    View,
    TouchableHighlight,
    Text,
    Image,
    StyleSheet,
    Animated,
    Easing
  } from "react-native";
  import { Animator } from '../common/AbstractAnimator'

  interface IProps {
    tile: any;
    onTileFlipped: any;
    width?: number;
    height: number;
    margin?: number;
  }

  const styles = StyleSheet.create({
    flipCard: {
        position: "relative",
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fronFace:{
        zIndex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        overflow: "hidden"
    },
    backFace:{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        overflow: "hidden",
        backgroundColor: "blue"
    }
  })

  export default class Tile extends Animator<IProps>{
    private _rotationAnimated: Animated.Value
    private _frontInterpolate: Animated.AnimatedInterpolation
    private _backInterpolate: Animated.AnimatedInterpolation
    private _frontOpacity: Animated.AnimatedInterpolation
    private _backOpacity: Animated.AnimatedInterpolation
    private _value: number

    constructor(props){
        super(props);
        this.flipToFront = this.flipToFront.bind(this);
        this.flipToBack  = this.flipToBack.bind(this);
    }

    componentWillMount() {
        this._rotationAnimated = new Animated.Value(0)
        this._value = 0;

        this._rotationAnimated.addListener(({ value }) => {
            this._value = value;
        });

        this._frontInterpolate = this._rotationAnimated.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        });

        this._backInterpolate = this._rotationAnimated.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        });

        this._frontOpacity = this._rotationAnimated.interpolate({
            inputRange: [89, 90],
            outputRange: [1,0]
        });

        this._backOpacity = this._rotationAnimated.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        });
    }

    private tileFlipHandler = () => {
        this.props.onTileFlipped(this.props.tile, this);
    }

    public flipToFront(){
        Animated.spring(this._rotationAnimated,{
            toValue: 180,
            friction: 8,
            tension: 10
        }).start();
    }

    public flipToBack() {
        Animated.spring(this._rotationAnimated,{
            toValue: 0,
            friction: 8,
            tension: 10
        }).start();

        Animated.timing(this._rotationAnimated,{
            toValue: 0,
            duration: 400,
            easing: Easing.linear
        }).start();
    }

    private tileGenerator = (
        frontAnimatedStyle, 
        backAnimatedStyle,
        frontOpacity,
        backOpacity
    ) => {
        const { tile, width, height, margin } = this.props;
        const { flipCard, fronFace, backFace } = styles;
        const tileDimensions = {width, height, margin};
        const animatedDimensions = {width: "100%", height: "100%"};

        if(tile.isMatched)
            return (
                <View style={[tileDimensions, { opacity: 0 }]}>
                </View>
            );
        
        return(
            <View style={[flipCard, tileDimensions]}>
                {/* Front */}
                <Animated.View style={[fronFace, frontAnimatedStyle, frontOpacity]}>
                    <TouchableHighlight 
                        style={{
                            backgroundColor:"#000",
                            width: "100%",
                            height: "100%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => this.tileFlipHandler()}>
                        <Text style={{ color: "#fff" }}>Back</Text>
                    </TouchableHighlight>
                </Animated.View>
                
                {/* Back */}
                <Animated.View style={[backFace, backAnimatedStyle, backOpacity]}>
                    <View 
                        style={{
                            width: "100%",
                            height: "100%",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{color:'#fff'}}>{tile.src}</Text>
                    </View>
                </Animated.View>
            </View>
        );
    }

    public render(){
        const frontAnimatedStyle = {
            transform: [
                { rotateY: this._frontInterpolate }
            ]
        };

        const backAnimatedStyle = {
            transform: [
                { rotateY: this._backInterpolate }
            ]
        };

        const frontOpacity = {
            opacity: this._frontOpacity
        };

        const backOpacity = {
            opacity: this._backOpacity
        };
        return this.tileGenerator(
            frontAnimatedStyle, 
            backAnimatedStyle,
            frontOpacity,
            backOpacity
        );
    }
  }