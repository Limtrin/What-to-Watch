import React from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent {
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
