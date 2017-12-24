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

  const isZenMode = gameMode => gameMode === "zen";

  const renderZenBanner = data => componentList => {
    if(isZenMode(data.gameMode)){
      return(
        <View>
          <Text>ZEN MODE </Text>
        </View>
      );
    }

    return componentList.map((EnhancedComponent, idx) => {
      return <EnhancedComponent key={idx} {...data} />
    });
  };

  const Gameboard = (props) => {
    const { data } = props.navigation.state.params;

    return (
      <Provider store={store}>
        <View style={{ flex: 1}}>
          
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {
              renderZenBanner(data)([Timer, Score])
            }
          </View>

          <Grid {...data}/>

          <View style={{ flex: 1 }}>
            {
              renderZenBanner(data)([Order])
            }
          </View>

        </View>
      </Provider>
    );
  };

  export default Gameboard;