import * as React from "react";
import {Subtract} from "utility-types";

export const TAB_NAME = {
  overview: `Overview`,
};

interface State {
  activeTab: string;
}

interface InjectingProps {
  activeTab: string;
  onActiveTabHandler: (tab: string) => void;
}

const withActiveTab = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveTab extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {activeTab: TAB_NAME.overview};
      this.handleActiveTab = this.handleActiveTab.bind(this);
    }

    handleActiveTab(item) {
      this.setState({
        activeTab: item
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          activeTab={this.state.activeTab}
          onActiveTabHandler={this.handleActiveTab}
        />
      );
    }
  }

  return WithActiveTab;
};

export default withActiveTab;
