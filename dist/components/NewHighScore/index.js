"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const styles = react_native_1.StyleSheet.create({
    form: {
        flexDirection: "row"
    },
    high_score: {
        textAlign: "center",
        fontFamily: "riffic",
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 15,
    },
    input: {
        flex: 2,
        height: 40
    },
    btn: {
        flex: 1,
        borderRadius: 5
    },
    btn_txt: {
        fontSize: 15,
        padding: 10,
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: "#a2b798",
        fontFamily: "riffic",
        textAlign: "center"
    }
});
class NewHighScore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            callOnce: false
        };
        this._onSubmit = (method, score) => {
            if (this.state.callOnce)
                return;
            if (this.state.input.length < 1) {
                // @ts-ignore: compile error
                alert("The text field cannot be empty. Please enter your name.");
                return;
            }
            this.setState({ callOnce: true }, () => method(this.state.input, score));
        };
    }
    render() {
        const { score, method, render } = this.props;
        const { form, high_score, input, btn, btn_txt } = styles;
        return (React.createElement(react_native_1.View, null,
            render,
            this.state.callOnce ? null : React.createElement(react_native_1.Text, { style: high_score }, "New High Score!"),
            this.state.callOnce ? null :
                React.createElement(react_native_1.View, { style: form },
                    React.createElement(react_native_1.TextInput, { maxLength: 15, autoFocus: true, placeholder: "Enter your name.", style: input, onChangeText: (text) => this.setState({ input: text }) }),
                    React.createElement(react_native_1.TouchableOpacity, { style: btn, onPress: () => this._onSubmit(method, score) },
                        React.createElement(react_native_1.Text, { style: btn_txt }, "Submit")))));
    }
}
exports.default = NewHighScore;
;
