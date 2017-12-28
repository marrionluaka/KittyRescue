import React, { 
    Component, 
    PropTypes 
  } from 'react';
  
  import { 
    View, 
    Text 
  } from 'react-native';
  
  import { Provider } from 'react-redux';
  import store from '../../store';
  
  import Grid from '../../components/Grid';
  import Timer from '../../components/Timer';
  import Score from '../../components/Score';
  import Order from '../../components/Order';

  const Zen = ({ render, zen }) => {
    const isZenMode = gameMode => gameMode === "zen";

    if(isZenMode(zen)){
      return (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text>ZEN MODE</Text>
        </View>
      );
    }

    return render();
  };

  const Gameboard = (props) => {
    const { data } = props.navigation.state.params;

    return (
      <Provider store={store}>
        <View style={{ flex: 1}}>
          
          <Zen 
            zen={data.gameMode}
            render={() => {
              const { gameMode, difficulty } = data;

              return (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <Timer 
                    gameMode={gameMode}
                    difficulty={difficulty}
                  />
                  <Score 
                    gameMode={gameMode}
                    difficulty={difficulty}
                  />
                </View>
              );
            }}
          />

          <Grid {...data}/>

          <Zen 
            zen={data.gameMode}
            render={() => {
              return (
                <View style={{ flex: 1 }}>
                  <Order />
                </View>
              );
            }}
          />

        </View>
      </Provider>
    );
  };

  export default Gameboard;