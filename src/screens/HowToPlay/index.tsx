import * as React from "react";
import Slides from "../../components/Slides";

import { NavigationActions } from "react-navigation";

const SLIDE_DATA = [
    { 
        title: "Gotta match 'em all",
        text: "Match all the kitties and rescue them from the evil jaws of the vicious dogs!", 
        slideImg: "cart", 
        key: 1 
    },
    { 
        title: "The order matters",
        text: `In order to gain the maximum amount of points, you must find the kitty that is directly being targeted.`, 
        slideImg: "fridge", 
        key: 2
    },
    { 
        title: "Don't get bit",
        text: `Watch out for the traps that lay ahead. You lose points every time you accounter a dog and if you find two dogs then game over!`, 
        slideImg: "bite",  
        key: 3
    },
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
