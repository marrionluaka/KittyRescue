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
import Popup from '../../components/Modal';
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
    tiles_flipped: 0,
    isGameOver: false

  };

  componentWillMount(){
    const { newGame, gridSize, difficulty } = this.props;
    newGame(gridSize, difficulty);
  }

  memoryFlipTile = tile => {
    const { tiles, difficulty } = this.props;
    let { memory_tiles, tiles_flipped } = this.state;

    const len = tiles.length - (this.levels[difficulty] || 0);

    if( memory_tiles.length < 2){
      this.setState({ tile });// causes a re-render
      if(memory_tiles.length == 0){
        memory_tiles.push(tile);
      } else if(memory_tiles.length == 1 && memory_tiles[0].id !== tile.id){
          memory_tiles.push(tile);
          if(memory_tiles[0].src == tile.src){

            if(tile.isTrap) return this.regenerateGrid(() => true, "Game Over");
            
            this.setState({ memory_tiles: [], tiles_flipped: tiles_flipped += 2 });
           
            this.props.tilesMatched(memory_tiles[0].src);

            this.regenerateGrid(() => tiles_flipped === len, "Board cleared... generating new board");

          } else {
            this.flip2Back(memory_tiles);
          }
      }
    }
  }

  regenerateGrid = (predicate, message) => {
    const { newGame, gridSize, difficulty } = this.props;

    if(predicate()){
      this.setState({ isGameOver: true })
      this.setState({
         tile: null,

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

  getPercentage = (size, windowWidth) => (((windowWidth / size) - size) / windowWidth * 100);
  
  
  gridBuilder = (size) => {
    const { tiles } = this.props;
    const FOUR_BY_FOUR = 8, SIX_BY_SIX = 18;
    const windowWidth = Dimensions.get('window').width;

    const gridSize = FOUR_BY_FOUR === size ? 
      { size: "4x4", margin: FOUR_BY_FOUR / 4 } : { size: "6x6", margin: SIX_BY_SIX / 6 };

    const _dimensions = {
      "4x4": { width:  this.getPercentage(4, windowWidth)+ "%", height: 4 },
      "6x6": { width:  this.getPercentage(6, windowWidth) + "%", height: 6 }
    };

    return tiles.map( el => {
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
    return(
      <View style={styles.container}>
        <Popup
            isVisible={this.state.isGameOver}
          >
            <View
              style={{
                  backgroundColor: "#fff",
                  padding: 30
              }}
            >
              <Text>Hello from Modal </Text>
              <TouchableOpacity
                onPress={() => this.setState({ isGameOver: false })}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
        </Popup>

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