import * as React from "react";
import { 
    View, 
    Text,
    TouchableOpacity
 } from 'react-native';

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

  private _order: any[] = [];
  private panels: any = React.Children.toArray(this.props.children);

  private selectedItem = item => this.setState({ item });

  private push = (key: string, value: any, callback = () => {}) => {
    this.setState({
        data: Object.assign({}, this.state.data, {
            [key]: value
        })
    }, callback);
  };

  private showNext = panel => {
    if(panel < this.panels.length - 1)
        this.setState({ panel: panel + 1 });
  };

  private showCurrent = panel => {
    return this.setState({ panel: panel });
  };

  private onComplete = callback => {
    callback(this.state.data);
  };

  private _renderSteps = (step, idx) => {
    return (
        <View key={idx}>
            <TouchableOpacity
                style={{
                    margin: "4%",
                    padding: 10,
                    backgroundColor: "#03A9F4",
                }}
                onPress={this.showCurrent.bind(this, idx)}
            >
                <Text>{ step }</Text>
            </TouchableOpacity>
        </View>
    );
  };

  private fn = (child, idx) => {
    this._order.length < 3 && this._order.push(child.props.name);

    return React.cloneElement(child, { 
        showNext: this.showNext.bind(this, idx),
        push: this.push.bind(this, child.props.propKey),
        onComplete: this.onComplete
      });
  };

  public render() {
    let items = React.Children.map(this.props.children, this.fn);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, justifyContent: 'center',
                alignItems: 'center' }}>
            <Text>Image</Text>

            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}>
                { this._order.map(this._renderSteps) }
            </View>
        </View>
        
        <View style={{ flex: 3 }}>
            <Text>Current Panel: {JSON.stringify(this.state.data)}</Text>
            {items[this.state.panel]}
        </View>
      </View>
    );
  }
}
