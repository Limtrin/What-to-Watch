import * as React from "react";
import {FilmInterface} from "../../types";
import {Subtract} from "utility-types";

interface State {
  activeItem: FilmInterface | string | null;
}

interface InjectingProps {
  itemLeaveHandler: () => void;
  itemEnterHandler: () => void;
  activeItem: FilmInterface | string | null;
}

const withActiveItem = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {activeItem: null};
      this.handleItemEnter = this.handleItemEnter.bind(this);
      this.handleItemLeave = this.handleItemLeave.bind(this);
    }

    handleItemEnter(item) {
      this.setState({
        activeItem: item
      });
    }

    handleItemLeave() {
      this.setState({
        activeItem: null
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          onItemEnterHandler={this.handleItemEnter}
          onItemLeaveHandler={this.handleItemLeave}
        >

        </Component>
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
