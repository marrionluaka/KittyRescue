import React, { 
  Component, 
  PropTypes 
} from 'react';

import { 
  View, 
  Text 
} from 'react-native';

import Grid from './Grid';
import Timer from './Timer';
import Score from './Score';
import Order from './Order';

export default class Gameboard extends Component {
  state = {
    imgsSrc: [
      "Test 1",
      "Test 2",
      "Test 3",
      "Test 4",
      "Test 5"
    ]
  }

  render(){
    return (
      <View style={{ flex: 1}}>
        <View style={{ flex: 1, flexDirection: 'row'}}>
          <Timer />
          <Score />
        </View>
        <Grid />
        <View style={{ flex: 1 }}>
          <Order />
        </View>
      </View>
    );
  }
}

// Gameboard.propTypes = {
//   children: PropTypes.object
// };
