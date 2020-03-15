import * as React from "react";
import {FilmType} from "../../types";
import {Subtract} from "utility-types";

interface State {
  activeItem: FilmType | null;
}

interface InjectingProps {
  onItemLeaveHandler: () => void;
  onItemEnterHandler: () => void;
  activeItem: () => void;
}

const withActiveItem = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveItem extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {activeItem: null};
      this.onItemEnterHandler = this.onItemEnterHandler.bind(this);
      this.onItemLeaveHandler = this.onItemLeaveHandler.bind(this);
    }

    onItemEnterHandler(item) {
      this.setState({
        activeItem: item
      });
    }

    onItemLeaveHandler() {
      this.setState({
        activeItem: null
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          activeItem={this.state.activeItem}
          onItemEnterHandler={this.onItemEnterHandler}
          onItemLeaveHandler={this.onItemLeaveHandler}
        >

        </Component>
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
