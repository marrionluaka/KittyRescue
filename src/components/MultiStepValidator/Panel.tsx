import * as React from "react";
import { View } from 'react-native';

export default class Panel extends React.Component<{
    name: string;
    propKey: string;
    render: any;
    showNext?: any;
    onComplete?: any;
    push?: any;
}, {}> {
  render() {
    return (
        <View>
            {this.props.render( 
                this.props.push,
                this.props.showNext,
                this.props.onComplete
            )}
        </View>
    );
  }
}
