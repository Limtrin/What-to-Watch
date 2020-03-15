import * as React from "react";
import {ActionCreator} from '../../reducer/review/review';
import {connect} from 'react-redux';
import {getText, getSendStatus, getFormBlock} from '../../reducer/review/selectors';
import {Subtract} from "utility-types";

interface State {
  rating: number;
}

interface InjectingProps {
  handleSubmit: () => void;
  handleChange: () => void;
  handleRatingChange: () => void;
}

const withRating = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithRating extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);
      this.state = {
        rating: 5,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleRatingChange = this.handleRatingChange.bind(this);
    }

    handleRatingChange(e) {
      this.setState({rating: e.target.value});
    }

    handleChange(e) {
      this.props.updateNewCommentText(e.target.value);
    }

    handleSubmit(evt) {
      const {onSubmit, filmId} = this.props;

      evt.preventDefault();

      onSubmit({
        text: this.props.textValue,
        rating: this.state.rating * 2,
      }, filmId);
    }

    render() {
      return (
        <Component
          {...this.props}
          handleRatingChange={this.handleRatingChange}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      textValue: getText(state),
      sendStatusValue: getSendStatus(state),
      formBlock: getFormBlock(state),
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      updateNewCommentText: (text) => {
        dispatch(ActionCreator.updateNewCommentText(text));
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithRating);
};

export default withRating;
