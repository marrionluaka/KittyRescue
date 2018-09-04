import * as React from "react";
import { Provider } from "react-redux";
import { TouchableOpacity, Text, BackHandler } from 'react-native';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';
import { NavigationActions } from "react-navigation";

import Board from "../../components/Board";
import store from "../../store";

class Game extends React.Component<{ navigation: any; }> {
  private static navigationOptions = { header: null };

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  private handleBackButtonClick() {
      this._backHome();
      return true;
  }

  private _backHome = () => {
    this.props.navigation.dispatch(
        NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: "Home"}),
        ],
      })
    )
};
  
  public render(){
    return (
      <Provider store={store}>
        <Board navigation={this.props.navigation} />
      </Provider>
    );
  }
};

export default Game;
