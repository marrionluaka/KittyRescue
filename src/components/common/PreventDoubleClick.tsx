import * as React from "react";
import { debounce } from "../../lib";

const PreventDoubleClick = (WrappedComponent) => {

    class _PreventDoubleClick extends React.PureComponent<{ onPress: any; style: any}> {

        onPress = debounce(() => this.props.onPress && this.props.onPress(), 300);

        render() {
            return <WrappedComponent {...this.props} onPress={this.onPress} />;
        }
    }

    return _PreventDoubleClick;
}

export { PreventDoubleClick };