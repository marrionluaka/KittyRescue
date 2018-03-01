import * as React from "react";
import { Provider } from "react-redux";

import Board from "../../components/Board";
import store from "../../store";

const Game = ({ navigation }) => {
  return (
    <Provider store={store}>
      <Board navigation={navigation} />
    </Provider>
  );
};

export default Game;
