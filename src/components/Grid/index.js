import React, { PropTypes, Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';

import Tile from '../Tile';
import * as tileActions from '../../actions/tiles'

const styles = StyleSheet.create({
  container:{
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden'
  }
});

class Grid extends Component{
  constructor(props){
    super(props);

    this.levels = {
      easy: 2,
      medium: 4,
      hard: 6
    };
  }

  state = {
    tile: null,
    memory_tiles: [],
    tiles_flipped: 0
  };

  componentWillMount(){
    const { newGame, gridSize, difficulty } = this.props;
    newGame(gridSize, difficulty);
  }

  memoryFlipTile = tile => {
    const { tiles, difficulty } = this.props;
    let { memory_tiles, tiles_flipped } = this.state;

    const len = tiles.length - this.levels[difficulty];
    
    if( memory_tiles.length < 2){
      this.setState({ tile });// causes a re-render
      if(memory_tiles.length == 0){
        memory_tiles.push(tile);
      } else if(memory_tiles.length == 1 && memory_tiles[0].id !== tile.id){
          memory_tiles.push(tile);
          if(memory_tiles[0].src == tile.src){

            this.regenerateGrid(() => tile.isTrap, "Game Over");
            
            this.setState({ memory_tiles: [], tiles_flipped: tiles_flipped += 2 });
           
            this.props.tilesMatched(memory_tiles[0].src);
            
            this.regenerateGrid(() => tiles_flipped == len, "Board cleared... generating new board");

          } else {
            this.flip2Back(memory_tiles);
          }
      }
    }
  }

  regenerateGrid = (predicate, message) => {
    const { newGame, gridSize, difficulty } = this.props;

    if(predicate()){
      alert(message);
      this.setState({
         memory_tiles: [],
         tiles_flipped: 0 
      }, () => newGame(gridSize, difficulty));
    }
  }

  flip2Back = memory_tiles => {
    setTimeout(() => {
      this.props.flipToBack(memory_tiles);
      
      this.setState({ memory_tiles:[] });
    }, 1);
  }
  
  gridBuilder = (size) => {
    const { tiles } = this.props;
    let { numbOfTraps } = this.state;

    const _dimensions = { // TODO: Come up with a mathematical formula
      "4x4": { width: "23%", height: 4 },
      "6x6": { width: "14.65%", height: 6 }
    };

    return tiles.map( el => {
      return (
        <Tile 
          key={el.id}
          tile={el}
          width={_dimensions[size].width}
          height={(Dimensions.get('window').width / _dimensions[size].height)}
          onTileFlipped={this.memoryFlipTile}
        />
      )
    });
  }

  render(){
    return(
      <View style={styles.container}>
        {
          this.gridBuilder(this.props.gridSize)
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  tiles: state.tiles
});

export default connect(mapStateToProps, tileActions)(Grid);