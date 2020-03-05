import React from 'react';
import PropTypes from 'prop-types';
import {ActionCreator} from '../../reducer/review/review.js';
import {connect} from 'react-redux';
import {getText, getSendStatus, getFormBlock} from '../../reducer/review/selectors';

class AddReview extends React.PureComponent {
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
    const postDisabled = this.props.textValue.length < 40 || this.props.textValue.length > 400;
    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">The Grand Budapest Hotel</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={this.handleSubmit}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" onChange={this.handleRatingChange}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" onChange={this.handleRatingChange}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" onChange={this.handleRatingChange}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" onChange={this.handleRatingChange}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" onChange={this.handleRatingChange}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                value={this.props.textValue}
                onChange={this.handleChange}
              />
              <div className="add-review__submit">
                <div style={{margin: `0 auto`}}>{this.props.sendStatusValue}</div>
                {postDisabled || this.props.formBlock ? <button className="add-review__btn" type="submit" disabled>Post</button> : <button className="add-review__btn" type="submit">Post</button>}
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

AddReview.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(AddReview);

// GenresList.propTypes = {
//   currentGenre: PropTypes.string.isRequired,
//   onGenreButtonClick: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   currentGenre: getGenres(state)
// });

// const mapDispatchToProps = (dispatch) => ({
//   onGenreButtonClick: (genre) => {
//     dispatch(ActionCreator.changeGenre(genre));
//     dispatch(ActionCreator.changeFilmsList());
//     dispatch(ActionCreator.resetFilmsCount());
//     dispatch(ActionCreator.showMoreFilms());
//   }
// });

export {AddReview};
// export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
