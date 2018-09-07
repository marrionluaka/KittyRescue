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
import { CRUNCHED } from "../../types";
import * as tileActions from "../../actions/tiles";
import * as timerActions from "../../actions/timer";
import styles from './styles';
import { IAudioService } from "../../interfaces";
import Audio from "../../services/Audio";

const { container } = styles;

const levels = {
  easy: 2,
  medium: 4,
  hard: 6
};

interface IGridProps {
  newGame: any;
  gameMode: string;
  gridSize: number;
  difficulty: string;
  callback: any;
  tilesState: any;
  invalidateTimer: any;
  addToMemory: any;
  tilesMatched: any;
  flipToBack: any;
  onTileFlipped: any;
}

class Grid extends React.Component<IGridProps, {}> {
  private memory_tiles: any[]
  private tiles: any[]
  private readonly audioService: IAudioService

  constructor(props){
    super(props); 
    
    this.memory_tiles = [];
    this.tiles = [];

    this.audioService = new Audio();
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
      this.showPopup("Game Over!");
  }

  private memoryFlipTile = (tile, tileCtx) => {
    const { tilesMatched, onTileFlipped, gameMode } = this.props;
    let { tiles, memory_tiles } = this;
    
    if(memory_tiles.length >= 2) return null;

    tileCtx.flipToFront();
    tiles.push(tileCtx);

    if(memory_tiles.length == 0){
      memory_tiles.push(tile)
      if(tile.isTrap) this.audioService.playSound("bite");
    } else if(memory_tiles.length == 1 && memory_tiles[0].id !== tile.id){
      memory_tiles.push(tile);

        if(memory_tiles[0].src === tile.src){

          if(tile.isTrap){
            this.emptyTilesContainer();
            return this.showPopup(CRUNCHED);
          }
         
          setTimeout(() => {
            tilesMatched(gameMode === "zen" ? memory_tiles.concat("zen") : memory_tiles);
            this.emptyTilesContainer();
          }, 500);
          onTileFlipped();
          
        } else {
          if(tile.isTrap) this.audioService.playSound("bite");
          this.flip2Back(tiles);
          onTileFlipped();
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
    }, 300);
  }

  private showPopup = msg => this.props.callback(msg, this.props.invalidateTimer);

  private _transform = (list: any[]): any[] => {
    const { gridSize } = this.props;
    const FOUR_BY_FOUR = 8, SIX_BY_SIX = 18;

    const _seed = FOUR_BY_FOUR === gridSize ? 4 : 6;

    return list.reduce((acc, val, idx) => {
      if(!acc.length) { 
        acc[0] = [].concat(val);
        return acc;
        }
    
      if(idx%_seed === 0) 
        acc[acc.length] = [].concat(val);
      else 
        acc[acc.length - 1] = acc[acc.length - 1].concat(val);
      
      return acc;
    }, []);
  }

  public render(){
    const { gridSize, tilesState, gameMode } = this.props;
    const matrix = this._transform(Object.values(tilesState.tiles));
    
    return(
      <View style={{ flex:1 }}>
        <View style={{ flex: 1 }}>
          { 
            matrix.map( (row, idx) =>{
              return (
                <View
                  key={idx}
                  style={{  flex: 1, flexDirection: 'row'}}>
                  {
                    row.map( el =>{
                      return (
                        <Tile 
                          key={el.id}
                          tile={el}
                          gridSize={gridSize}
                          isZenMode={() => gameMode === "zen"}
                          matchedTiles={tilesState.alreadyMatchedTiles}
                          onTileFlipped={this.memoryFlipTile}
                          zenSound={this.audioService.playSound}
                        />
                      );
                    })
                  }
                </View>
              );
            })
          }
        </View>
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