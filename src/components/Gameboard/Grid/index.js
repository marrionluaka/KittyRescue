import React, { PropTypes } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import Tile from '../Tile';

const styles = StyleSheet.create({
  container:{
    flex: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  box:{
    margin: '1%',
    backgroundColor: 'powderblue'
  }
});

const arrText4 = [
  { key: 1, value: 'A' },
  { key: 2, value: 'B' },
  { key: 3, value: 'C' },
  { key: 4, value: 'D' },

  { key: 5, value: 'E' },
  { key: 6, value: 'F' },
  { key: 7, value: 'G' },
  { key: 8, value: 'H' },

  { key: 9, value: 'I' },
  { key: 10, value: 'J' },
  { key: 11, value: 'K' },
  { key: 12, value: 'L' },

  { key: 13, value: 'M' },
  { key: 14, value: 'N' },
  { key: 15, value: 'O' },
  { key: 16, value: 'P' }
];

const arrText5 = [

  { key: 1, value: 'A' },
  { key: 2, value: 'B' },
  { key: 3, value: 'C' },
  { key: 4, value: 'D' },
  { key: 2, value: 'E' },

  { key: 1, value: 'A' },
  { key: 2, value: 'B' },
  { key: 3, value: 'C' },
  { key: 4, value: 'D' },
  { key: 2, value: 'E' },

  { key: 1, value: 'A' },
  { key: 2, value: 'B' },
  { key: 3, value: 'C' },
  { key: 4, value: 'D' },
  { key: 2, value: 'E' },

  { key: 1, value: 'A' },
  { key: 2, value: 'B' },
  { key: 3, value: 'C' },
  { key: 4, value: 'D' },
  { key: 2, value: 'E' },

  { key: 1, value: 'A' },
  { key: 2, value: 'B' },
  { key: 3, value: 'C' },
  { key: 4, value: 'D' },
  { key: 2, value: 'E' }
];

const gridBuilder = (arr, size) => {
  const _dimensions = { // TODO: Come up with a mathematical formula
    "4x4": { width: "23%", height: 4 },
    "5x5": { width: "18%", height: 5 }
  };

  return arr.map((el, idx) => {
    return (
      <Tile 
        key={idx}
        tile={el}
        width={_dimensions[size].width}
        height={(Dimensions.get('window').width / _dimensions[size].height)}
      />
    );
  });
};

const Grid = () =>(
    <View style={styles.container}>
      {
        gridBuilder(arrText5, "5x5")
      }
      {/* <Text>Clean up </Text> */}
    </View>
);

// Grid.propTypes = {
//   children: PropTypes.array
// };

export default Grid;
