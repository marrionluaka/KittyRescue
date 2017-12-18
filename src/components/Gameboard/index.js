import React, { 
  Component, 
  PropTypes 
} from 'react';

import { 
  View, 
  Text 
} from 'react-native';

import { Provider } from 'react-redux';
import store from './store';

import Grid from './Grid';
import Timer from './Timer';
import Score from './Score';
import Order from './Order';

export default class Gameboard extends Component {

  render(){
    return (
      <Provider store={store}>
        <View style={{ flex: 1}}>
          
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Timer />
            <Score />
          </View>

          <Grid />

          <View style={{ flex: 1 }}>
            <Order />
          </View>

        </View>
      </Provider>
    );
  }
}

// Gameboard.propTypes = {
//   children: PropTypes.object
// };
