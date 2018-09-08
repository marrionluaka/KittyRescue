"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
const Board_1 = require("../../components/Board");
const store_1 = require("../../store");
class Game extends React.Component {
    constructor(props) {
        super(props);
        this._backHome = () => {
            this.props.navigation.dispatch(react_navigation_1.NavigationActions.reset({
                index: 0,
                actions: [
                    react_navigation_1.NavigationActions.navigate({ routeName: "Home" }),
                ],
            }));
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentWillMount() {
        react_native_1.BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        react_native_1.BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        this._backHome();
        return true;
    }
    render() {
        return (React.createElement(react_redux_1.Provider, { store: store_1.default },
            React.createElement(Board_1.default, { navigation: this.props.navigation })));
    }
}
Game.navigationOptions = { header: null };
;
exports.default = Game;
