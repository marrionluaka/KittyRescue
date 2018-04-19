import * as React from "react";
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  Dimensions 
} from "react-native";

import { connect } from "react-redux";

import Tile from "../Tile";
import { GAME_OVER_MSG } from "../../types";
import * as tileActions from "../../actions/tiles";
import * as timerActions from "../../actions/timer";

const styles = StyleSheet.create({
  container:{
    flex: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden"
  }
});

const levels = {
  easy: 2,
  medium: 4,
  hard: 6
};

class Grid extends React.Component<{
  newGame: any;
  gridSize: number;
  difficulty: string;
  callback: any;
  tilesState: any;
  invalidateTimer: any;
  addToMemory: any;
  tilesMatched: any;
  flipToBack: any;
}, {}> {
  private memory_tiles: any[]
  private tiles: any[]

  constructor(props){
    super(props); 
    
    this.memory_tiles = [];
    this.tiles = [];
  }

  componentWillMount(){
    const { newGame, gridSize, difficulty } = this.props;
    newGame(gridSize, difficulty);
  }

  componentWillReceiveProps(props){
    const { 
      tilesState, 
      difficulty
    } = props;

    if(tilesState.tiles_flipped === 0 && this.tiles.length)
      this.emptyTilesContainer();

    const len = Object.values(tilesState.tiles).length - (levels[difficulty] || 0);

    if(tilesState.tiles_flipped === len) 
      this.showPopup("Board cleared... generating new board");
  }

  private memoryFlipTile = (tile, tileCtx) => {
    const { tilesMatched } = this.props;
    let { tiles, memory_tiles } = this;
    
    if(memory_tiles.length >= 2) return null;

    tileCtx.flipToFront();
    tiles.push(tileCtx);

    if(memory_tiles.length == 0){
      memory_tiles.push(tile)
    } else if(memory_tiles.length == 1 && memory_tiles[0].id !== tile.id){
      memory_tiles.push(tile);

        if(memory_tiles[0].src === tile.src){

          if(tile.isTrap){
            this.emptyTilesContainer();
            return this.showPopup(GAME_OVER_MSG);
          } 
         
          setTimeout(() => {
            tilesMatched(memory_tiles);
            this.emptyTilesContainer();
          }, 500);
          
        } else {
          this.flip2Back(tiles);
        }
    }
  }

  private emptyTilesContainer = () => {
    this.tiles.length = 0;
    this.memory_tiles.length = 0;
  }

  private flip2Back = (tiles: any[]) => {
    setTimeout(() => {
      tiles.forEach(tile => tile.flipToBack());
      this.props.flipToBack(!!this.memory_tiles.find( tile => tile.isTrap ));
      this.emptyTilesContainer();
    }, 500);
  }

  private showPopup = msg => this.props.callback(msg, this.props.invalidateTimer);

  private getPercentage = (size, windowWidth) => (((windowWidth / size) - size) / windowWidth * 100);
  
  private gridBuilder = size => {
    const { tilesState } = this.props;
    const FOUR_BY_FOUR = 8, SIX_BY_SIX = 18;
    const windowWidth = Dimensions.get("window").width;

    const gridSize = FOUR_BY_FOUR === size ? 
      { size: "4x4", margin: FOUR_BY_FOUR / 4 } : { size: "6x6", margin: SIX_BY_SIX / 6 };

    const _dimensions = {
      "4x4": { width:  this.getPercentage(4, windowWidth) + "%", height: 4 },
      "6x6": { width:  this.getPercentage(6, windowWidth) + "%", height: 6 }
    };

    return Object.values(tilesState.tiles).map( el => {
      return (
        <Tile 
          key={el.id}
          tile={el}
          margin={gridSize.margin}
          width={_dimensions[gridSize.size].width}
          height={(windowWidth / _dimensions[gridSize.size].height)}
          onTileFlipped={this.memoryFlipTile}
        />
      )
    });
  }

  public render(){
    const { gridSize } = this.props;
    
    return(
      <View style={styles.container}>
        {
          this.gridBuilder(gridSize)
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  tilesState: state.tilesState
});

const mapDispatchToProps = {
  ...tileActions,
  ...timerActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Grid);