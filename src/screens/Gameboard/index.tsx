import * as React from "react";
import { Provider } from "react-redux";
import { TouchableOpacity, Text } from 'react-native';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';

import Board from "../../components/Board";
import store from "../../store";

class Game extends React.Component<{ navigation: any; }> {

  public render(){
    return (
      <Provider store={store}>
        <Board navigation={this.props.navigation} />
      </Provider>
    );
  }
};

export default Game;
