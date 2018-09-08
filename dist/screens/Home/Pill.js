"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
const styles = react_native_1.StyleSheet.create({
    btn: {
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingLeft: '8%',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(128,128,128,.5)',
        marginBottom: '5%',
        marginLeft: '6%',
        marginRight: '6%',
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 50
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17
    },
    subTitle: {
        fontSize: 12,
        marginTop: -5
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: '3%',
        justifyContent: 'center'
    },
    arrow: {
        padding: '1%',
        paddingLeft: '14%',
        paddingRight: '10%',
        borderWidth: 1,
        borderColor: "rgba(128,128,128,.7)",
        borderRadius: 50,
        fontWeight: 'bold'
    }
});
const Pill = ({ title, subTitle, onNavigate }) => {
    return (React.createElement(react_native_1.TouchableOpacity, { style: styles.btn, onPress: onNavigate },
        React.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
            React.createElement(react_native_1.View, { style: { flex: 2, justifyContent: 'center' } },
                React.createElement(react_native_1.Text, { style: styles.title }, title),
                React.createElement(react_native_1.Text, { style: styles.subTitle }, subTitle)),
            React.createElement(react_native_1.View, { style: styles.arrowContainer },
                React.createElement(FontAwesome_1.default, { style: styles.arrow, name: "angle-right", size: 30, color: "rgba(128,128,128,.7)" })))));
};
exports.default = Pill;
