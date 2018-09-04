import * as React from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from "react-native";

const styles = StyleSheet.create({
    form:{
        flexDirection: "row"
    },
    high_score:{
        textAlign: "center",
        fontFamily: "riffic",
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 15,
    },
    input:{
        flex: 2,
        height: 40
    },
    btn:{
        flex: 1,
        borderRadius: 5
    },
    btn_txt:{
        fontSize: 15,
        padding: 10,
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: "#a2b798",
        fontFamily: "riffic",
        textAlign: "center"
    }
});

export default class NewHighScore extends React.Component<{
    score: number;
    method: any;
    render: any;
}, { input: string; callOnce: boolean }> {

    constructor(props){
        super(props);
    }

    state = {
        input: "",
        callOnce: false
    }

    private _onSubmit = (method: any, score: number) => {
        if(this.state.callOnce) return;

        if(this.state.input.length < 1){
            // @ts-ignore: compile error
            alert("The text field cannot be empty. Please enter your name.");
            return;
        }

        this.setState({ callOnce: true }, () => method(this.state.input, score));
    };
        
    render(){
        const { score, method, render } = this.props;
        const { form, high_score, input, btn, btn_txt } = styles;
        return (
            <View>
                {render}
                
                { this.state.callOnce ? null : <Text style={high_score}>New High Score!</Text> }

                {
                    this.state.callOnce ? null :
                    <View style={form}>
                        <TextInput
                            maxLength={15}
                            autoFocus
                            placeholder="Enter your name."
                            style={input}
                            onChangeText={(text) => this.setState({ input: text })}
                        />
                        
                        <TouchableOpacity
                            style={btn}
                            onPress={() => this._onSubmit(method, score) }
                        >
                            <Text style={btn_txt}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
};