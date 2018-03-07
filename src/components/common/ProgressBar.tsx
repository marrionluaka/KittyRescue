import * as React from "react";
import { 
    Text,
    Animated,
    Easing,
    View
 } from "react-native";

class ProgressBar extends React.Component<{}, {}> {
    constructor(props){
        super(props);
    }

    /**
     * 
     * function move() {
            var elem = document.getElementById("myBar"); 
            var width = 10;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                } else {
                    width++; 
                    elem.style.width = width + '%'; 
                    elem.innerHTML = width * 1 + '%';
                }
            }
        }
     */

    

    render(){
        return (
            <View>
            </View>
        );
    }
}

export { ProgressBar };