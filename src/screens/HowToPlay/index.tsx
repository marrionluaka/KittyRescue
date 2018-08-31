import * as React from "react";
import Slides from "../../components/Slides";

import { NavigationActions } from "react-navigation";

const SLIDE_DATA = [
    { 
        title: "Search Engine Optimization",
        text: "Lorem ipsum dolor sit amet, onsectetur adipisicing elit, sed do eiusmod tem incidunt ut labore. Roses are red, violets are blue.", 
        slideImg: "cart", 
        key: 1 
    },
    { 
        title: "Search Engine Optimization",
        text: "Lorem ipsum dolor sit amet, onsectetur adipisicing elit, sed do eiusmod tem incidunt ut labore. Roses are red, violets are blue.", 
        slideImg: "fight",  
        key: 2 
    },
    { 
        title: "Search Engine Optimization",
        text: `
            Lorem ipsum dolor sit amet, onsectetur adipisicing elit, sed do eiusmod tem incidunt 
            ut labore. Roses are red, violets are blue.
        `, 
        slideImg: "fridge", 
        key: 3 
    }
];

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: "Home"}),
  ],
});

export default class HowToPlay extends React.Component<{ navigation: any }, {}> {
    private static navigationOptions = { header: null };

    public render() {
        const { navigation } = this.props;

        return (
            <Slides
                data={SLIDE_DATA}
                onComplete={() => navigation.dispatch(resetAction) }
            />
        );
    }
}
