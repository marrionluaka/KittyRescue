import * as React from "react";
import { 
    View, 
    Text,
    Image
 } from 'react-native';
 import { ProgressBar } from '../common/ProgressBar';
import { BackButton } from "../common";

interface Props {
    activeBtn: any;
    inactiveBtn: any;
    bannersSrc: any[];
    backHomeFn: any;
}

interface State { 
    item: string;
    panel: number;
    data: any;
    progress: number;
}

export default class MultiStepValidator extends React.Component<Props, State> {
    constructor(props) {
        super(props);
    }
    
    private _order: any[] = [];
    private readonly panels: React.ReactChild[] = React.Children.toArray(this.props.children);
    private readonly ONE_HUNDRED_PERCENT: number = 100;
    private readonly _loadingPercentage: number = this.ONE_HUNDRED_PERCENT/this.panels.length;
    private readonly _panelBg = ["#b3ddd1", "#f5b994", "#d1dce2"]

    state = {
        item: "None",
        panel: 0,
        data: {},
        progress: 0
    }

    private push = (key: string, value: any, callback = (): void => {}) => {
        this.setState({
            progress: this.state.progress === this.ONE_HUNDRED_PERCENT 
                ? this.state.progress 
                : this.state.progress + this._loadingPercentage,
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
        return this.setState({ 
            progress: panel === 0 ? 
                this.state.progress * panel 
                : this.state.progress === this.ONE_HUNDRED_PERCENT 
                ? this.state.progress - (this._loadingPercentage *(panel+1))
                : this.state.progress - this._loadingPercentage,
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
                this.state.data[step.key],
                step.pos === this.panels.length - 1) : null;

        return (
            <View 
                style={{ flex: 1 }}
                key={step.pos}> 
                { current } 
            </View>
        );
    };

    private skipTo = (panel: number) => {
        return this.setState({
            panel,
            progress: this.state.progress + this._loadingPercentage
        });
    };

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
            <View style={{ flex: 1.8, backgroundColor: this._panelBg[this.state.panel] }}>
                <BackButton backHomeFn={this.props.backHomeFn}/>
                <View style={{ 
                        flex: 1, 
                        justifyContent: 'center',
                        alignItems: 'center'
                }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Image source={this.props.bannersSrc[this.state.panel]} />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end'
                    }}>
                        { this._order.map(this._renderSteps) }
                    </View>
                </View>
            </View>

            <ProgressBar
                color="#8ba753"
                progress={this.state.progress}
                seed={() => this.state.panel * this._loadingPercentage}
            />
            
            <View style={{ flex: 2 }}>
                {items[this.state.panel]}
            </View>
        </View>
        );
    }
}
