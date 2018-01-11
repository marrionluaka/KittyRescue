import React, { PropTypes, Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import Tile from '../Tile';
import * as tileActions from '../../actions/tiles';
import * as timerActions from '../../actions/timer';

const styles = StyleSheet.create({
  container:{
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden'
  }
});

const levels = {
  easy: 2,
  medium: 4,
  hard: 6
};

class Grid extends Component{
  constructor(props){
    super(props); 
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

    const len = tilesState.tiles.length - (levels[difficulty] || 0);

    if(tilesState.tiles_flipped === len) 
      this.showPopup("Board cleared... generating new board");
  }

  memoryFlipTile = tile => {
    const { 
      tilesState,
      addToMemory
    } = this.props;

    if( tilesState.memory_tiles.length > 2) return null;

    if( tilesState.memory_tiles.length == 0){
      addToMemory(tile);
    } else if(tilesState.memory_tiles.length == 1 && tilesState.memory_tiles[0].id !== tile.id){
        addToMemory(tile);
        
        if(tilesState.memory_tiles[0].src === tile.src){

          if(tile.isTrap) return this.showPopup("Game Over");
         
          this.props.tilesMatched(tilesState.memory_tiles[0].src);

        } else {
          this.flip2Back();
        }
    }
  }

  showPopup = msg => this.props.callback(msg, this.props.invalidateTimer);

  flip2Back = () => {
    setTimeout(() => {
      this.props.flipToBack(this.props.tilesState.memory_tiles);
    }, 1);
  }

  getPercentage = (size, windowWidth) => (((windowWidth / size) - size) / windowWidth * 100);
  
  
  gridBuilder = size => {
    const { tilesState } = this.props;
    const FOUR_BY_FOUR = 8, SIX_BY_SIX = 18;
    const windowWidth = Dimensions.get('window').width;

    const gridSize = FOUR_BY_FOUR === size ? 
      { size: "4x4", margin: FOUR_BY_FOUR / 4 } : { size: "6x6", margin: SIX_BY_SIX / 6 };

    const _dimensions = {
      "4x4": { width:  this.getPercentage(4, windowWidth)+ "%", height: 4 },
      "6x6": { width:  this.getPercentage(6, windowWidth) + "%", height: 6 }
    };

    return tilesState.tiles.map( el => {
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

  render(){
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