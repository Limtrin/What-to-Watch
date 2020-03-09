import React from 'react';
import PropTypes from 'prop-types';

class AddReview extends React.PureComponent {
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
          <form
            action="#"
            className="add-review__form"
            onSubmit={(e) => {
              this.props.handleSubmit(e);
            }}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
                  onChange={(e) => {
                    this.props.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
                  onChange={(e) => {
                    this.props.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
                  onChange={(e) => {
                    this.props.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
                  onChange={(e) => {
                    this.props.handleRatingChange(e);
                  }}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
                  onChange={(e) => {
                    this.props.handleRatingChange(e);
                  }}/>
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
                onChange={(e) => {
                  this.props.handleChange(e);
                }}
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
  handleChange: PropTypes.func.isRequired,
  handleRatingChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  filmId: PropTypes.number.isRequired,
  updateNewCommentText: PropTypes.func.isRequired,
  textValue: PropTypes.string.isRequired,
  sendStatusValue: PropTypes.string.isRequired,
  formBlock: PropTypes.bool.isRequired,
};

export default AddReview;
