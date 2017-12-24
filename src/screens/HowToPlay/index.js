import React, { Component } from 'react';
import Slides from '../../components/Slides';
import { NavigationActions } from 'react-navigation'

const SLIDE_DATA = [
    { text: 'Hello There!', slideStyles: { backgroundColor: "#03A9F4"} },
    { text: 'Hello There!', slideStyles: { backgroundColor: "#009688"} },
    { text: 'Hello There!', slideStyles: { backgroundColor: "#03A9F4"} }
];

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Home'})
  ]
});

export default class HowToPlay extends Component{
    static navigationOptions = { header: null };

    render(){
        const { navigation } = this.props;
        
        return (
            <Slides 
                data={SLIDE_DATA}
                onComplete={() => navigation.dispatch(resetAction) }
            />
        );
    }
}