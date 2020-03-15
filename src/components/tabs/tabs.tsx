import * as React from "react";
import * as moment from "moment";
import {ratingTransition} from "../../utils";
import {FilmType} from "../../types";

const TAB_NAME = {
  overview: `Overview`,
  details: `Details`,
  reviews: `Reviews`
};

const TAB_LIST = [TAB_NAME.overview, TAB_NAME.details, TAB_NAME.reviews];

interface Props {
  film: FilmType;
}

interface State {
  currentTab: string;
}

class Tabs extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: TAB_NAME.overview
    };
  }

  _onNavChangeHandler(navItem) {
    this.setState({currentTab: navItem});
  }

  render() {
    const {currentTab} = this.state;
    const {film} = this.props;
    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {TAB_LIST.map((navItem) => {
              return (
                <li key={navItem} className={`movie-nav__item ` + (navItem === this.state.currentTab ? `movie-nav__item--active` : ``)}>
                  <a
                    href="#"
                    className="movie-nav__link"
                    onClick={(evt) => {
                      evt.preventDefault();
                      this._onNavChangeHandler(navItem);
                    }}
                  >
                    {navItem}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {currentTab === TAB_NAME.overview && (
          <>
            <div className="movie-rating">
              <div className="movie-rating__score">{film.rating}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{ratingTransition(+film.rating)}</span>
                <span className="movie-rating__count">{film.votes} ratings</span>
              </p>
            </div>
            <div className="movie-card__text">
              <p>{film.description}</p>
              <p className="movie-card__director"><strong>Director: {film.director}</strong></p>
              <p className="movie-card__starring"><strong>Starring: {film.starring.slice(0, 4).join(`, `)} and other</strong></p>
            </div>
          </>
        )}

        {currentTab === TAB_NAME.details && (
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{film.director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {film.starring.map((actor, index) => (
                    <React.Fragment key={actor + index}>
                      {actor} <br />
                    </React.Fragment>
                  ))}
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{film.time} minutes</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{film.genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{film.year}</span>
              </p>
            </div>
          </div>
        )}

        {currentTab === TAB_NAME.reviews && (<div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {film.reviews.map((review) => (
              <div className="review" key={review.id}>
                <blockquote className="review__quote">
                  <p className="review__text">{review.text}</p>
                  <footer className="review__details">
                    <cite className="review__author">{review.author.name}</cite>
                    <time className="review__date" dateTime={review.date}>
                      {moment(review.date).format(`MMMM D, YYYY`)}
                    </time>
                  </footer>
                </blockquote>
                <div className="review__rating">{review.rating}</div>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default Tabs;
