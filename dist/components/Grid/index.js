"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_native_1 = require("react-native");
const react_redux_1 = require("react-redux");
const Tile_1 = require("../Tile");
const types_1 = require("../../types");
const tileActions = require("../../actions/tiles");
const timerActions = require("../../actions/timer");
const styles_1 = require("./styles");
const Audio_1 = require("../../services/Audio");
const { container } = styles_1.default;
const levels = {
    easy: 2,
    medium: 4,
    hard: 6
};
class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.memoryFlipTile = (tile, tileCtx) => {
            const { tilesMatched, onTileFlipped, gameMode } = this.props;
            let { tiles, memory_tiles } = this;
            if (memory_tiles.length >= 2)
                return null;
            tileCtx.flipToFront();
            tiles.push(tileCtx);
            if (memory_tiles.length == 0) {
                memory_tiles.push(tile);
                if (tile.isTrap)
                    this.audioService.playSound("bite");
            }
            else if (memory_tiles.length == 1 && memory_tiles[0].id !== tile.id) {
                memory_tiles.push(tile);
                if (memory_tiles[0].src === tile.src) {
                    if (tile.isTrap) {
                        this.emptyTilesContainer();
                        return this.showPopup(types_1.CRUNCHED);
                    }
                    setTimeout(() => {
                        tilesMatched(gameMode === "zen" ? memory_tiles.concat("zen") : memory_tiles);
                        this.emptyTilesContainer();
                    }, 500);
                    onTileFlipped();
                }
                else {
                    if (tile.isTrap)
                        this.audioService.playSound("bite");
                    this.flip2Back(tiles);
                    onTileFlipped();
                }
            }
        };
        this.emptyTilesContainer = () => {
            this.tiles.length = 0;
            this.memory_tiles.length = 0;
        };
        this.flip2Back = (tiles) => {
            setTimeout(() => {
                tiles.forEach(tile => tile.flipToBack());
                this.props.flipToBack(!!this.memory_tiles.find(tile => tile.isTrap));
                this.emptyTilesContainer();
            }, 300);
        };
        this.showPopup = msg => this.props.callback(msg, this.props.invalidateTimer);
        this._transform = (list) => {
            const { gridSize } = this.props;
            const FOUR_BY_FOUR = 8, SIX_BY_SIX = 18;
            const _seed = FOUR_BY_FOUR === gridSize ? 4 : 6;
            return list.reduce((acc, val, idx) => {
                if (!acc.length) {
                    acc[0] = [].concat(val);
                    return acc;
                }
                if (idx % _seed === 0)
                    acc[acc.length] = [].concat(val);
                else
                    acc[acc.length - 1] = acc[acc.length - 1].concat(val);
                return acc;
            }, []);
        };
        this.memory_tiles = [];
        this.tiles = [];
        this.audioService = new Audio_1.default();
    }
    componentWillMount() {
        const { newGame, gridSize, difficulty } = this.props;
        newGame(gridSize, difficulty);
    }
    componentWillReceiveProps(props) {
        const { tilesState, difficulty } = props;
        if (tilesState.tiles_flipped === 0 && this.tiles.length)
            this.emptyTilesContainer();
        const len = Object.values(tilesState.tiles).length - (levels[difficulty] || 0);
        if (tilesState.tiles_flipped === len)
            this.showPopup("Game Over!");
    }
    render() {
        const { gridSize, tilesState, gameMode } = this.props;
        const matrix = this._transform(Object.values(tilesState.tiles));
        return (React.createElement(react_native_1.View, { style: { flex: 1 } },
            React.createElement(react_native_1.View, { style: { flex: 1 } }, matrix.map((row, idx) => {
                return (React.createElement(react_native_1.View, { key: idx, style: { flex: 1, flexDirection: 'row' } }, row.map(el => {
                    return (React.createElement(Tile_1.default, { key: el.id, tile: el, gridSize: gridSize, isZenMode: () => gameMode === "zen", matchedTiles: tilesState.alreadyMatchedTiles, onTileFlipped: this.memoryFlipTile, zenSound: this.audioService.playSound }));
                })));
            }))));
    }
}
const mapStateToProps = state => ({
    tilesState: state.tilesState
});
const mapDispatchToProps = Object.assign({}, tileActions, timerActions);
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Grid);
