import * as React from "react";
import { 
    Text,
    Animated,
    Easing,
    View
 } from "react-native";

class ProgressBar extends React.Component<{ progress: number; }, {}> {
    constructor(props){
        super(props);
    }

    state = {
        percentage: 0,
        width: 0
    };

    render(){
        return (
            <View
                style={{
                    width: '100%',
                    backgroundColor: '#ddd'
                }}
            >
                <Animated.View
                    style={{
                        width: this.props.progress + "%",
                        height: 5,
                        backgroundColor: '#4CAF50'
                    }}
                />
            </View>
        );
    }
}

export { ProgressBar };