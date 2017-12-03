import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import React, { Component, PropTypes } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Left,
  Right,
  Text,
  Body
 } from 'native-base';
 import Gameboard from './src/components/Gameboard';

 const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  render(){

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column'
      }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>

        
          <Gameboard />
        
      </View>
    );
  }
}




const styles = StyleSheet.create({
});
