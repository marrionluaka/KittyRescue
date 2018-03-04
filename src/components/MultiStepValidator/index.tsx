import * as React from "react";
import { 
    View, 
    Text
 } from 'react-native';

export default class MultiStepValidator extends React.Component<{
    activeBtn: any;
    inactiveBtn: any;
}, { 
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
      data: {}
  }

  private _order: any[] = [];
  private panels: React.ReactChild[] = React.Children.toArray(this.props.children);

  private push = (key: string, value: any, callback = () => {}) => {
    this.setState({
        data: Object.assign({}, this.state.data, {
            [key]: value
        })
    }, callback);
  };

  private showNext = (panel: number) => {
    if(panel < this.panels.length - 1)
        this.setState({ panel: panel + 1 });
  };

  private disable = (data: any, current: number) => {
	const values = Object.keys(data)
						 .slice(current)
						 .reduce((acc, val) =>{
                            acc[val] = null;
                            return acc;
                          }, {});
	
	return {
		...data,
		...values
	};
  };

  private showCurrent = (panel: number) => {
    const _currentPanel = Object.keys(this.state.data)[panel];

    return this.setState({ 
        panel: panel,
        data: this.disable(this.state.data, panel)
    });
  };

  private onComplete = callback => {
    callback(this.state.data);
  };

  private _renderSteps = (step: any): JSX.Element => {
    const current = !this.state.data[step.key] ?
        this.props.inactiveBtn(step, this.state.panel) : step.pos <= this.state.panel ? 
        this.props.activeBtn(
            step, 
            this.showCurrent.bind(this, step.pos), 
            this.state.data[step.key]) : null;

    return (
        <View key={step.pos}> 
            { current } 
        </View>
    );
  };

  private skipTo = (panel: number) => this.setState({ panel });

  private _prepareChildrenData = (child: any, idx: number) => {
    this._order.length < this.panels.length && this._order.push({
        name: child.props.name,
        key: child.props.propKey,
        pos: idx
    });

    return React.cloneElement(child, { 
        showNext: this.showNext.bind(this, idx),
        push: this.push.bind(this, child.props.propKey),
        onComplete: this.onComplete,
        skipTo: this.skipTo
      });
  };

  public render() {
    let items = React.Children.map(this.props.children, this._prepareChildrenData);

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
