import React from 'react';
import { Provider } from 'react-redux';

import store from '../../store';
import Board from '../../components/Board';

const Game = ({ navigation }) => {
  return (
    <Provider store={store}>
      <Board navigation={navigation} />
    </Provider>
  );
};

export default Game;