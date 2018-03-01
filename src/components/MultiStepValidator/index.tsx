import * as React from "react";
import { View, Text } from 'react-native';

export default class MultiStepValidator extends React.Component<{}, { 
    item: string, 
    panel: number, 
    data: any 
}> {
  constructor(props) {
    super(props);
  }

  state = {
      item: "None",
      panel: 0,
      data: null
  }

  private panels: any = React.Children.toArray(this.props.children);

  private selectedItem = item => this.setState({ item });

  private push = (key: string, value: any, callback = () => {}) => {
    this.setState({
        data: Object.assign({}, this.state.data, {
            [key]: value
        })
    }, callback);
  }

  private showNext = panel => {
    if(panel < this.panels.length - 1)
        this.setState({ panel: panel + 1 });
  };

  private showPrev = panel => {
    if(panel > 0)
        this.setState({ panel: panel - 1 });
  };

  private onComplete = callback => {
    callback(this.state.data);
  };

  private fn = (child, idx) => React.cloneElement(child, { 
      showNext: this.showNext.bind(this, idx),
      push: this.push.bind(this, child.props.propKey),
      onComplete: this.onComplete
    });

  public render() {
    let items = React.Children.map(this.props.children, this.fn);
    return (
      <View>
        <Text>You have Selected: {this.state.item || "nothing"}</Text>
        <Text>Current Panel: {JSON.stringify(this.state.data)}</Text>
        {items[this.state.panel]}
      </View>
    );
  }
}
