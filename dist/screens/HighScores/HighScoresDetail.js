"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const R = require("ramda");
const react_native_1 = require("react-native");
const FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
const NoScores_1 = require("./NoScores");
const scores_1 = require("../../queries/scores");
const styles_1 = require("./styles");
const lib_1 = require("../../lib");
const _getDifficulty = (mode, scores) => {
    const move2Last = R.curry(_moveToLast);
    return R.compose(Object.values, move2Last("hard"), R.compose(R.groupBy(R.prop('difficulty')), R.sortBy(R.prop('difficulty'))))(scores);
};
const _moveToLast = (el, diff) => {
    const keys = Object.keys(diff), idx = keys.indexOf(el), sorted = lib_1.removeAt(idx, keys).concat(keys.slice(idx, idx + 1));
    return sorted.reduce((acc, key) => (acc[key] = diff[key]) && acc, {});
};
const HighScoresDetail = ({ gameMode, display, backHome }) => {
    const scores = scores_1.default.fetchScore(gameMode);
    const res = _getDifficulty(gameMode, scores);
    const { tbl_c, row_c, grid_s, name_s, score_s, square, diff_text, separator, playNow, noScoreText } = styles_1.default;
    const winners = [
        "#C98910",
        "#A8A8A8",
        "#965A38"
    ];
    const gridColors = {
        "4x4": "#FF598F",
        "6x6": "#FEA564"
    };
    return (React.createElement(react_native_1.View, { style: { flex: 1 } }, !!res.length ? res.map((diff) => {
        return (React.createElement(react_native_1.View, { key: diff[0].id, style: tbl_c },
            React.createElement(react_native_1.Text, { style: diff_text },
                "Difficulty: ",
                lib_1.capitalizeFirstLetter(diff[0].difficulty)),
            diff.map((record, idx) => {
                return (React.createElement(react_native_1.View, { key: record.id },
                    React.createElement(react_native_1.View, { style: row_c },
                        React.createElement(react_native_1.View, { style: { flex: .5, justifyContent: "center" } }, idx <= 2 ? (React.createElement(FontAwesome_1.default, { style: { marginLeft: -5 }, name: "trophy", size: 20, color: winners[idx] })) : (React.createElement(react_native_1.Text, { style: { fontSize: 16, fontFamily: "riffic" } }, idx + 1))),
                        React.createElement(react_native_1.View, { style: { flex: 1, marginLeft: 5 } },
                            React.createElement(react_native_1.Text, { style: [grid_s, { backgroundColor: record.gridSize > 8 ? gridColors["6x6"] : gridColors["4x4"] }] }, record.gridSize > 8 ? "6x6" : "4x4")),
                        React.createElement(react_native_1.View, { style: { flex: 4, justifyContent: "center" } },
                            React.createElement(react_native_1.Text, { style: name_s }, record.name.trim())),
                        React.createElement(react_native_1.View, { style: { flex: 1, justifyContent: "center" } },
                            React.createElement(react_native_1.Text, { style: [score_s] }, record.score))),
                    diff.length - 1 === idx ? null : (React.createElement(react_native_1.View, { style: separator }))));
            })));
    }) : (React.createElement(NoScores_1.NoScores, null,
        React.createElement(react_native_1.View, { style: { alignItems: "center" } },
            React.createElement(react_native_1.Image, { source: require("../../img/cat-walk.png") })),
        React.createElement(react_native_1.Text, { style: [noScoreText, { paddingTop: "5%" }] }, "Unbelievable! There are no high scores yet."),
        React.createElement(react_native_1.Text, { style: [noScoreText, { paddingTop: "2%" }] }, "Play meow and be the very first on the leaderboard!"),
        React.createElement(react_native_1.TouchableOpacity, { style: playNow, onPress: backHome },
            React.createElement(react_native_1.Text, { style: [noScoreText, { color: "#fff" }] }, "Play Meow!"))))));
};
exports.default = HighScoresDetail;
