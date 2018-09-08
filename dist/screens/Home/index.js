"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const Pill_1 = require("./Pill");
const styles_1 = require("./styles");
class Home extends React.Component {
    render() {
        const { navigation } = this.props;
        const { imgBackground, header, container, headerContent, catText, rescueText, catsContainer, catBox, catLady, catFish, catEyes, catGift } = styles_1.styles;
        return (React.createElement(react_native_1.ImageBackground, { style: imgBackground, source: require("../../img/pastel.png") },
            React.createElement(react_native_1.View, { style: {
                    flex: 1
                } },
                React.createElement(react_native_1.View, { style: container },
                    React.createElement(react_native_1.View, { style: header },
                        React.createElement(react_native_1.View, { style: headerContent },
                            React.createElement(react_native_1.Text, { style: catText }, "Kitty"),
                            React.createElement(react_native_1.Text, { style: rescueText }, "Rescue")),
                        React.createElement(react_native_1.View, { style: catsContainer },
                            React.createElement(react_native_1.Image, { source: require("../../img/cat-box.png"), style: catBox }),
                            React.createElement(react_native_1.Image, { source: require("../../img/cat-lady.png"), style: catLady }),
                            React.createElement(react_native_1.Image, { source: require("../../img/cat-fish.png"), style: catFish }),
                            React.createElement(react_native_1.Image, { source: require("../../img/cat-eyes.png"), style: catEyes }),
                            React.createElement(react_native_1.Image, { source: require("../../img/cat-gift.png"), style: catGift })))),
                React.createElement(react_native_1.View, { style: { flex: 1, justifyContent: 'flex-end' } },
                    React.createElement(Pill_1.default, { title: "Play", subTitle: "Start a new adventure!", onNavigate: () => navigation.navigate("GameConfigurator") }),
                    React.createElement(Pill_1.default, { title: "How To Play", subTitle: "Learn to play the game!", onNavigate: () => navigation.navigate("HowToPlay") }),
                    React.createElement(Pill_1.default, { title: "High Scores", subTitle: "See your best scores!", onNavigate: () => navigation.navigate("HighScores") })),
                React.createElement(react_native_1.View, { style: { alignItems: 'center', paddingBottom: 20 } },
                    React.createElement(react_native_1.Text, null,
                        '\u00A9',
                        " ",
                        new Date().getFullYear())))));
    }
}
Home.navigationOptions = { header: null };
exports.default = Home;
