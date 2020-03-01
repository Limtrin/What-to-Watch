import React from "react";
import PropTypes from "prop-types";
import FilmsList from "../films-list/films-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item.js";
import FullVideoPlayer from "../full-video-player/full-video-player.jsx";

const FilmsListWrapped = withActiveItem(FilmsList);
const GenresListWrapped = withActiveItem(GenresList);


const Main = (props) => {

  const {film, onHeaderClickHandler, onFilmCardClickHandler, onItemEnterHandler, onItemLeaveHandler, activeItem} = props;
  const {name: filmName, genre: filmGenre, year: filmYear} = film;

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{filmName}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{filmGenre}</span>
                <span className="movie-card__year">{filmYear}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  onClick={() => {
                    onItemEnterHandler(film);
                  }}
                  className="btn btn--play movie-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresListWrapped />

          <FilmsListWrapped
            onHeaderClickHandler={onHeaderClickHandler}
            onFilmCardClickHandler={onFilmCardClickHandler}
          />

          <ShowMoreButton />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
      {activeItem && (<FullVideoPlayer film={film} onItemLeaveHandler={onItemLeaveHandler}/>)}
    </>
  );
};

Main.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          rating: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  onHeaderClickHandler: PropTypes.func.isRequired,
  onFilmCardClickHandler: PropTypes.func.isRequired,
  onItemEnterHandler: PropTypes.func,
  onItemLeaveHandler: PropTypes.func,
  activeItem: PropTypes.any,
};


export default Main;
