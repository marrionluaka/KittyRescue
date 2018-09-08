"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const SlideItem_1 = require("./SlideItem");
const Dots_1 = require("./Dots");
class Test extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            offset: 0
        };
    }
    render() {
        const SCREEN_WIDTH = react_native_1.Dimensions.get("window").width;
        const { data, onComplete } = this.props;
        const renderSlides = (slide, index) => {
            return (React.createElement(SlideItem_1.default, Object.assign({ key: slide.id }, slide, { renderButton: () => {
                    var text = index === data.length - 1 ? "Let's Start" : "Skip";
                    return (React.createElement(react_native_1.TouchableOpacity, { onPress: () => onComplete(), style: {
                            position: "absolute",
                            bottom: 0,
                            backgroundColor: "rgba(125,125,125,.4)",
                            width: "100%"
                        } },
                        React.createElement(react_native_1.Text, { style: {
                                color: "#fff",
                                textAlign: "center",
                                fontWeight: "bold",
                                paddingTop: "5%",
                                paddingBottom: "5%",
                                fontSize: 20
                            } }, text.toLocaleUpperCase())));
                } })));
        };
        return (React.createElement(react_native_1.View, { style: { flex: 1 } },
            React.createElement(react_native_1.FlatList, { horizontal: true, data: data, renderItem: ({ item, index }) => renderSlides(item, index), style: { flex: 1, position: "relative" }, showsHorizontalScrollIndicator: false, directionalLockEnabled: true, pagingEnabled: true, onScroll: e => {
                    if (e.nativeEvent.contentOffset.x % SCREEN_WIDTH === 0)
                        this.setState({ offset: e.nativeEvent.contentOffset.x });
                } }),
            React.createElement(Dots_1.default, { data: data, offset: this.state.offset })));
    }
}
exports.default = Test;
