import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../reducer/review/review.js';
import {connect} from 'react-redux';
import {getText, getSendStatus, getFormBlock} from '../../reducer/review/selectors';

const withRating = (Component) => {
  class WithRating extends React.PureComponent {
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

  WithRating.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    filmId: PropTypes.number.isRequired,
    updateNewCommentText: PropTypes.func.isRequired,
    textValue: PropTypes.string.isRequired,
    sendStatusValue: PropTypes.string.isRequired,
    formBlock: PropTypes.bool.isRequired,
  };

  let mapStateToProps = (state) => {
    return {
      textValue: getText(state),
      sendStatusValue: getSendStatus(state),
      formBlock: getFormBlock(state),
    };
  };

  let mapDispatchToProps = (dispatch) => {
    return {
      updateNewCommentText: (text) => {
        dispatch(ActionCreator.updateNewCommentText(text));
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithRating);
};

export default withRating;
