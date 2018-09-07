import * as React from "react";

import { 
    View,
    TouchableOpacity,
    Text,
    Image,
    ImageBackground,
    Animated,
    Easing
  } from "react-native";
import { Animator } from '../common/AbstractAnimator';
import styles from './styles';

interface IProps {
    tile: any;
    gridSize: number;
    matchedTiles?: any;
    onTileFlipped: any;
    zenSound: any;
    isZenMode: any;
}

export default class Tile extends Animator<IProps>{
    private _rotationAnimated: Animated.Value
    private _frontInterpolate: Animated.AnimatedInterpolation
    private _backInterpolate: Animated.AnimatedInterpolation
    private _frontOpacity: Animated.AnimatedInterpolation
    private _backOpacity: Animated.AnimatedInterpolation
    private _value: number

    private readonly _FOUR_BY_FOUR = 8
    private readonly _is4x4

    constructor(props){
        super(props);
        this.flipToFront = this.flipToFront.bind(this);
        this.flipToBack  = this.flipToBack.bind(this);
        this._is4x4 = props.gridSize === this._FOUR_BY_FOUR
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

    private getMatchedTile = (pred) => {
        const size = this._is4x4 ? 48 : 24;

        const _matched = pred() 
                        ?<Image 
                            source={require('../../img/greencheck.png')}
                            style={{width: size, height: size }}
                        /> 
                        : 
                        <Image 
                            source={require('../../img/redx.png')}
                            style={{width: size, height: size}}
                        />
                        
        return _matched;
    }

    private tileGenerator = (
        frontAnimatedStyle, 
        backAnimatedStyle,
        frontOpacity,
        backOpacity
    ) => {
        const { tile, matchedTiles, isZenMode, zenSound } = this.props;
        const { 
            flipCard, 
            frontFace, 
            backFace,
            overlay,
            card_c,
            gloss
         } = styles;
        const animatedDimensions = {width: "100%", height: "100%"};
        const size = this._is4x4 ? 72 : 48;

        if(tile.isMatched){
            return (
                <View style={[{position: 'relative'}, flipCard]}>
                    <ImageBackground
                        source={tile.src}
                        style={{width: size, height: size}}
                    >
                        <View style={overlay}>
                            {
                                isZenMode() ? (zenSound("ding") && null) : this.getMatchedTile(
                                    () => matchedTiles[tile.src] && matchedTiles[tile.src].orderMatched
                                )
                            }
                        </View>
                    </ImageBackground>
                </View>
            );
        }
        
        return(
            <View style={flipCard}>
                {/* Front */}
                <Animated.View style={[frontFace, frontAnimatedStyle, frontOpacity]}>
                    <TouchableOpacity 
                        style={[gloss, card_c]}
                        onPress={() => this.tileFlipHandler()}>
                        <Image source={require("../../img/cat-yarn.png")} style={{ 
                            width:15, 
                            height: 15,
                            padding: "25%"
                        }}/>
                    </TouchableOpacity>
                </Animated.View>
                
                {/* Back */}
                <Animated.View style={[backFace, backAnimatedStyle, backOpacity]}>
                    <View 
                        style={[gloss, card_c]}>
                        <Image 
                            source={tile.src} 
                            style={{ width: size, height: size }} />
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