"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Slides_1 = require("../../components/Slides");
const react_navigation_1 = require("react-navigation");
const SLIDE_DATA = [
    {
        title: "Gotta match 'em all",
        text: "Match all the kitties and rescue them from the evil jaws of the vicious dogs!",
        slideImg: "cart",
        key: 1
    },
    {
        title: "The order matters",
        text: `In order to gain the maximum amount of points, you must find the kitty that is directly being targeted.`,
        slideImg: "fridge",
        key: 2
    },
    {
        title: "Don't get bit",
        text: `Watch out for the traps that lay ahead. You lose points every time you accounter a dog and if you find two dogs then game over!`,
        slideImg: "bite",
        key: 3
    },
];
const resetAction = react_navigation_1.NavigationActions.reset({
    index: 0,
    actions: [
        react_navigation_1.NavigationActions.navigate({ routeName: "Home" }),
    ],
});
class HowToPlay extends React.Component {
    render() {
        const { navigation } = this.props;
        return (React.createElement(Slides_1.default, { data: SLIDE_DATA, onComplete: () => navigation.dispatch(resetAction) }));
    }
}
HowToPlay.navigationOptions = { header: null };
exports.default = HowToPlay;
